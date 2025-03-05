import { ArrowLeft,Home, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function Denied() {
    const navigate = useNavigate();
    

    const handleGoHome = () => {
        navigate('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center px-4 py-8">
            <div className="max-w-md w-full space-y-8 bg-white/10 backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 p-8 text-center">
                <div className="flex justify-center mb-6">
                    <div className="bg-red-500/20 p-4 rounded-full">
                        <Lock className="text-red-400 w-16 h-16" strokeWidth={1.5} />
                    </div>
                </div>

                <h1 className="text-6xl font-bold text-white tracking-tight">
                    403
                </h1>

                <div className="space-y-4">
                    <h2 className="text-2xl font-semibold text-red-300">
                        Access Denied
                    </h2>
                    <p className="text-gray-300 text-sm">
                        You do not have permission to access this administrative area. 
                        Please contact your system administrator if you believe this is an error.
                    </p>
                </div>

                <div className="flex justify-center space-x-4 pt-6">
                    <button 
                        onClick={() => navigate(-1)} 
                        className="flex items-center space-x-2 bg-white/10 hover:bg-white/20 text-white px-6 py-3 rounded-lg transition-all duration-300 border border-white/20 hover:border-white/40"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        <span>Go Back</span>
                    </button>

                    <button 
                        onClick={handleGoHome} 
                        className="flex items-center space-x-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-6 py-3 rounded-lg transition-all duration-300 border border-blue-500/30 hover:border-blue-500/50"
                    >
                        <Home className="w-5 h-5" />
                        <span>Home</span>
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Denied;