import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Lock, Mail, Loader2, Play } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', {
                email,
                password
            });

            // Store token
            localStorage.setItem('novaToken', data.token);

            // Redirect to dashboard
            navigate('/admin/dashboard');
        } catch (err: any) {
            console.error('Login error:', err);
            setError(err.response?.data?.message || 'Invalid credentials');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4 relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute inset-0 bg-dotted-pattern opacity-10 pointer-events-none"></div>
            <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-primary/20 blur-[150px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 w-1/2 h-1/2 bg-purple-600/20 blur-[150px] pointer-events-none"></div>

            <div className="w-full max-w-md bg-card/60 backdrop-blur-xl border border-white/10 p-8 rounded-3xl shadow-2xl relative z-10">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 text-primary mb-4 border border-white/5 shadow-inner">
                        <Lock size={32} />
                    </div>
                    <h1 className="text-3xl font-bold font-heading">Admin <span className="text-primary">Login</span></h1>
                    <p className="text-muted-foreground mt-2">Access the Nova Community dashboard.</p>
                </div>

                {error && (
                    <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl text-red-500 text-sm text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full bg-secondary/30 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:border-primary/50 focus:bg-secondary/50 transition-all"
                                placeholder="admin@novacommunity.com"
                                required
                            />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium ml-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full bg-secondary/30 border border-white/10 rounded-xl px-12 py-3 focus:outline-none focus:border-primary/50 focus:bg-secondary/50 transition-all"
                                placeholder="••••••••"
                                required
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full py-4 bg-primary text-primary-foreground font-bold rounded-xl hover:bg-primary/90 transition-all shadow-lg hover:shadow-primary/25 disabled:opacity-70 flex items-center justify-center space-x-2"
                    >
                        {loading ? <Loader2 className="animate-spin" size={20} /> : (
                            <>
                                <span>Sign In</span>
                                <Play size={16} fill="currentColor" />
                            </>
                        )}
                    </button>
                </form>
            </div>

            <p className="mt-8 text-center text-xs text-muted-foreground">
                &copy; {new Date().getFullYear()} Nova Community. Authorized personnel only.
            </p>
        </div>
    );
};

export default Login;
