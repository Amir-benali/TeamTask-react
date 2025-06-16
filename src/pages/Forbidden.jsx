import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { Card, CardContent } from "../components/ui/card"
import { Button } from "../components/ui/button"
import { Shield, AlertTriangle, ArrowLeft } from "lucide-react"

export default function Forbidden() {
    const [mounted, setMounted] = useState(false)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const navigate = useNavigate()

    useEffect(() => {
        setMounted(true)

        const handleMouseMove = (e) => {
            setMousePosition({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        <div className="min-h-screen bg-gray-900 flex overflow-hidden relative">
            <div className="absolute inset-0 overflow-hidden">
                <div
                    className="absolute w-96 h-96 bg-gradient-to-r from-red-500/20 to-orange-500/20 rounded-full blur-3xl transition-all duration-1000 ease-out"
                    style={{
                        left: mousePosition.x - 192,
                        top: mousePosition.y - 192,
                    }}
                />

                <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-red-500/10 to-amber-500/10 rounded-3xl rotate-45 animate-pulse"></div>
                <div className="absolute bottom-32 right-32 w-24 h-24 bg-gradient-to-br from-orange-500/10 to-yellow-500/10 rounded-full animate-bounce delay-1000"></div>

                <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
            </div>

            <div className="w-full flex items-center justify-center p-6 lg:p-12">
                <div className="w-full max-w-md">
                    <Card className="bg-gray-800/50 backdrop-blur-xl border-gray-700/50 shadow-2xl animate-in fade-in-0 slide-in-from-bottom-8 duration-1000">
                        <CardContent className="p-8 space-y-6 text-center">
                            {/* Icon */}
                            <div className="relative mx-auto">
                                <div className="w-20 h-20 bg-gradient-to-br from-red-500 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-6 animate-in zoom-in-0 duration-1000">
                                    <Shield className="w-10 h-10 text-white" />
                                </div>
                                <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center">
                                    <AlertTriangle className="w-4 h-4 text-white" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="space-y-4 animate-in fade-in-0 duration-1000 delay-200">
                                <h1 className="text-3xl font-bold bg-gradient-to-r from-white via-red-200 to-orange-200 bg-clip-text text-transparent">
                                    Access Forbidden
                                </h1>
                                <p className="text-gray-400">
                                    You don't have permission to access this page. Please contact your administrator or return to the dashboard.
                                </p>
                            </div>

                            {/* Buttons */}
                            <div className="flex flex-col space-y-3 pt-4 animate-in fade-in-0 duration-1000 delay-300">
                                <Button 
                                    onClick={() => navigate("/dashboard")}
                                    className="w-full h-12 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-medium transition-all transform hover:scale-[1.02] active:scale-[0.98] relative overflow-hidden group"
                                >
                                    <div className="relative flex items-center justify-center space-x-2">
                                        <ArrowLeft className="w-5 h-5 transition-transform duration-200 group-hover:-translate-x-1" />
                                        <span>Return to Dashboard</span>
                                    </div>
                                </Button>
                                
                                <Button 
                                    variant="outline"
                                    onClick={() => navigate("/login")}
                                    className="w-full h-12 border-gray-600 text-gray-300 hover:bg-gray-700 transition-colors"
                                >
                                    Return to Login
                                </Button>
                            </div>

                            {/* Status code */}
                            <div className="pt-4 border-t border-gray-700 animate-in fade-in-0 duration-1000 delay-400">
                                <p className="text-sm text-gray-500">Error Code: 403</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
