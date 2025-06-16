import { useState, useEffect, use } from "react"
import { useNavigate } from "react-router"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Alert, AlertDescription } from "../components/ui/alert"
import { Eye, EyeOff, ArrowRight, Loader2, Sparkles, Zap, Shield } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { getUser, loginUser } from "../features/auth/authSlice"

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  })
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [errmessage, setMessage] = useState("")
  const [mounted, setMounted] = useState(false)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const { user, isSuccess, message } = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { email, password } = formData

  useEffect(() => {
    setMounted(true)

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  useEffect(() => {
    if (message) {
        setIsError(true)
      setMessage(message)
    }
  }, [ message])

  useEffect(() => { 
    dispatch(getUser())
        .unwrap()
        .then((userData) => {
          navigate('/dashboard')
        })
        .catch((error) => {
        })  
  }, [])

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
    if (isError) {
      setIsError(false)
      setMessage("")
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    setIsLoading(true)
    setIsError(false)
    try {
      dispatch(loginUser(formData))
    } catch (error) {
      setIsError(true)
      setMessage(error.message )
    } finally {
      setIsLoading(false)
    }
  }

  if (!mounted) {
    return null
  }

    if (isSuccess || user) {
    navigate('/dashboard');
  }

  return (
    <div className="min-h-screen bg-gray-900 flex overflow-hidden relative">
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="absolute w-96 h-96 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
          style={{
            left: mousePosition.x - 192,
            top: mousePosition.y - 192,
          }}
        />

        <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-3xl rotate-45 animate-pulse"></div>
        <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-pink-500/10 to-rose-500/10 rounded-full animate-bounce delay-1000"></div>
        <div className="absolute top-1/2 left-10 w-16 h-16 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-lg rotate-12 animate-pulse delay-500"></div>

        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 relative items-center justify-center p-12">
        <div className="max-w-md text-center space-y-8 animate-in fade-in-0 slide-in-from-left-8 duration-1000">
          {/* Logo area */}
          <div className="relative">
            <div className="w-20 h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-in zoom-in-0 duration-1000 delay-200">
              <Zap className="w-10 h-10 text-white" />
            </div>
            <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full animate-ping"></div>
          </div>

          <div className="space-y-4">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white via-purple-200 to-pink-200 bg-clip-text text-transparent animate-in fade-in-0 duration-1000 delay-300">
              Welcome to TeamTask
            </h1>
          </div>

        

          {/* Decorative elements */}
          <div className="relative pt-8">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-12">
        <div className="w-full max-w-md">
          {/* Mobile logo */}
          <div className="lg:hidden text-center mb-8 animate-in fade-in-0 duration-1000">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
          </div>

          <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 shadow-2xl animate-in fade-in-0 slide-in-from-right-8 duration-1000">
            <CardContent className="p-8 space-y-6">
              {/* Header */}
              <div className="space-y-2 animate-in fade-in-0 duration-1000 delay-200">
                <h2 className="text-2xl font-bold text-white hidden lg:block">Sign In</h2>
                <p className="text-gray-400">Enter your credentials to access your account</p>
              </div>

              {/* Error message */}
              {isError && (
                <Alert className="border-red-500/50 bg-red-500/10 animate-in fade-in-0 slide-in-from-top-2 duration-500">
                  <AlertDescription className="text-red-400">{errmessage}</AlertDescription>
                </Alert>
              )}

              <form onSubmit={onSubmit} className="space-y-6">
                {/* Email field */}
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-300">
                  <label className="text-sm font-medium text-gray-300">Email</label>
                  <div className="relative group">
                    <Input
                      name="email"
                      type="email"
                      value={email}
                      onChange={onChange}
                      placeholder="Enter your email"
                      className="h-12 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-500"
                      required
                    />
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Password field */}
                <div className="space-y-2 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-400">
                  <label className="text-sm font-medium text-gray-300">Password</label>
                  <div className="relative group">
                    <Input
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={onChange}
                      placeholder="Enter your password"
                      className="h-12 bg-gray-900/50 border-gray-600 text-white placeholder-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300 hover:border-gray-500 pr-12"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors duration-200"
                    >
                      {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                    <div className="absolute inset-0 rounded-md bg-gradient-to-r from-purple-500/0 via-purple-500/0 to-pink-500/0 group-focus-within:from-purple-500/10 group-focus-within:via-purple-500/5 group-focus-within:to-pink-500/10 transition-all duration-300 pointer-events-none"></div>
                  </div>
                </div>

                {/* Remember me & Forgot password */}
                <div className="flex items-center justify-between text-sm animate-in fade-in-0 duration-1000 delay-500">
                  <label className="flex items-center space-x-2 text-gray-300 cursor-pointer">
                    <input
                      type="checkbox"
                      className="rounded border-gray-600 bg-gray-900/50 text-purple-500 focus:ring-purple-500/20"
                    />
                    <span>Remember me</span>
                  </label>
                  <button
                    type="button"
                    className="text-purple-400 hover:text-purple-300 transition-colors duration-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <Button
                  type="submit"
                  disabled={isLoading}
                  className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] disabled:scale-100 animate-in fade-in-0 slide-in-from-bottom-4 duration-1000 delay-600 relative overflow-hidden group"
                >
                
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative flex items-center justify-center space-x-2">
                    {isLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Signing in...</span>
                      </>
                    ) : (
                      <>
                        <span>Sign In</span>
                        <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
                      </>
                    )}
                  </div>
                </Button>
              </form>

              {/* Divider */}
              <div className="relative animate-in fade-in-0 duration-1000 delay-700">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-gray-800 text-gray-400">Demo Account</span>
                </div>
              </div>

              {/* Demo info */}
              <div className="text-center space-y-2 animate-in fade-in-0 duration-1000 delay-800">
                <p className="text-xs text-gray-500">
                  <span className="text-purple-400">Email:</span> demo@example.com
                </p>
                <p className="text-xs text-gray-500">
                  <span className="text-purple-400">Password:</span> password
                </p>
              </div>

              {/* Sign up link */}
              <div className="text-center animate-in fade-in-0 duration-1000 delay-900">
                <p className="text-gray-400">
                  {"Don't have an account? "}
                  <button onClick={() => navigate("/register")} className="text-purple-400 hover:text-purple-300 font-medium transition-colors duration-200">
                    Create one now
                  </button>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
