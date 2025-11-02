// ===========================================
// KEREN LOTTERY - Page Admin
// Marqueur: 555
// ===========================================

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { useLanguage } from '../contexts/LanguageContext';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Ticket,
  Users,
  Trophy,
  RefreshCw,
  LogIn,
  LogOut,
  Eye,
  EyeOff,
  AlertCircle,
  CheckCircle,
  ShoppingBag,
  FileText
} from 'lucide-react';

interface LotteryEntry {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  source: 'form' | 'shopify';
  created_at: string;
  metadata?: Record<string, any>;
}

interface Draw {
  id: string;
  draw_name: string;
  executed_at?: string;
  winner_entry?: LotteryEntry;
}

const translations = {
  he: {
    title: 'ניהול הגרלה',
    loginTitle: 'כניסה לאזור הניהול',
    username: 'שם משתמש',
    password: 'סיסמה',
    login: 'התחבר',
    logout: 'התנתק',
    loading: 'טוען...',
    
    participants: 'משתתפים',
    totalParticipants: 'סה"כ משתתפים',
    drawButton: 'הפעל הגרלה',
    drawName: 'שם ההגרלה',
    drawNamePlaceholder: 'הגרלה #1 - תשפד',
    refresh: 'רענן רשימה',
    
    table: {
      name: 'שם',
      email: 'אימייל',
      phone: 'טלפון',
      source: 'מקור',
      date: 'תאריך',
    },
    
    sourceForm: 'טופס',
    sourceShopify: 'Shopify',
    
    drawResult: 'תוצאות ההגרלה',
    winner: 'זוכה',
    totalEntries: 'מספר משתתפים',
    seed: 'זרע (Seed)',
    
    errorAuth: 'שגיאה באימות',
    errorLoading: 'שגיאה בטעינת הנתונים',
    errorDraw: 'שגיאה בהפעלת ההגרלה',
    
    successDraw: 'הגרלה הופעלה בהצלחה!',
  },
  fr: {
    title: 'Administration Loterie',
    loginTitle: 'Connexion Zone Admin',
    username: 'Nom d\'utilisateur',
    password: 'Mot de passe',
    login: 'Se connecter',
    logout: 'Se déconnecter',
    loading: 'Chargement...',
    
    participants: 'Participants',
    totalParticipants: 'Total participants',
    drawButton: 'Lancer le Tirage',
    drawName: 'Nom du Tirage',
    drawNamePlaceholder: 'Tirage #1 - 2024',
    refresh: 'Actualiser',
    
    table: {
      name: 'Nom',
      email: 'Email',
      phone: 'Téléphone',
      source: 'Source',
      date: 'Date',
    },
    
    sourceForm: 'Formulaire',
    sourceShopify: 'Shopify',
    
    drawResult: 'Résultat du Tirage',
    winner: 'Gagnant',
    totalEntries: 'Nombre de participants',
    seed: 'Graine (Seed)',
    
    errorAuth: 'Erreur d\'authentification',
    errorLoading: 'Erreur de chargement',
    errorDraw: 'Erreur lors du tirage',
    
    successDraw: 'Tirage effectué avec succès!',
  },
  en: {
    title: 'Lottery Administration',
    loginTitle: 'Admin Login',
    username: 'Username',
    password: 'Password',
    login: 'Login',
    logout: 'Logout',
    loading: 'Loading...',
    
    participants: 'Participants',
    totalParticipants: 'Total Participants',
    drawButton: 'Run Draw',
    drawName: 'Draw Name',
    drawNamePlaceholder: 'Draw #1 - 2024',
    refresh: 'Refresh',
    
    table: {
      name: 'Name',
      email: 'Email',
      phone: 'Phone',
      source: 'Source',
      date: 'Date',
    },
    
    sourceForm: 'Form',
    sourceShopify: 'Shopify',
    
    drawResult: 'Draw Result',
    winner: 'Winner',
    totalEntries: 'Total Entries',
    seed: 'Seed',
    
    errorAuth: 'Authentication error',
    errorLoading: 'Loading error',
    errorDraw: 'Draw error',
    
    successDraw: 'Draw executed successfully!',
  }
};

export default function LotteryAdminPage() {
  const { currentLanguage, setLanguage, t } = useLanguage();
  const { toast } = useToast();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [entries, setEntries] = useState<LotteryEntry[]>([]);
  const [drawResult, setDrawResult] = useState<any>(null);
  const [drawName, setDrawName] = useState('');
  
  const [credentials, setCredentials] = useState({
    username: '',
    password: ''
  });

  const tr = translations[currentLanguage as keyof typeof translations] || translations.en;

  // Vérifier si l'utilisateur est déjà authentifié (localStorage)
  useEffect(() => {
    const authKey = localStorage.getItem('lottery_admin_auth');
    if (authKey === 'true') {
      setIsAuthenticated(true);
      loadEntries();
    }
  }, []);

  const getAuthHeader = () => {
    const username = credentials.username || process.env.LOTTERY_ADMIN_USER || 'admin';
    const password = credentials.password || process.env.LOTTERY_ADMIN_PASS || 'admin';
    return 'Basic ' + btoa(`${username}:${password}`);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Tester l'authentification en récupérant les entrées
      const response = await fetch('/api/lottery/entries', {
        headers: {
          'Authorization': getAuthHeader()
        }
      });

      if (response.ok) {
        setIsAuthenticated(true);
        localStorage.setItem('lottery_admin_auth', 'true');
        await loadEntries();
        toast({
          title: tr.login,
          description: 'Authentifié avec succès',
          variant: 'default',
        });
      } else {
        toast({
          title: tr.errorAuth,
          description: 'Nom d\'utilisateur ou mot de passe incorrect',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Login error:', error);
      toast({
        title: tr.errorAuth,
        description: 'Erreur de connexion',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('lottery_admin_auth');
    setEntries([]);
    setDrawResult(null);
    setCredentials({ username: '', password: '' });
  };

  const loadEntries = async () => {
    try {
      const response = await fetch('/api/lottery/entries', {
        headers: {
          'Authorization': getAuthHeader()
        }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.ok) {
          setEntries(data.entries || []);
        }
      } else if (response.status === 401) {
        handleLogout();
      }
    } catch (error) {
      console.error('Error loading entries:', error);
      toast({
        title: tr.errorLoading,
        description: 'Impossible de charger les participants',
        variant: 'destructive',
      });
    }
  };

  const handleDraw = async () => {
    if (!drawName.trim()) {
      toast({
        title: tr.errorDraw,
        description: 'Veuillez entrer un nom pour le tirage',
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch('/api/lottery/draw', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': getAuthHeader()
        },
        body: JSON.stringify({ drawName: drawName.trim() }),
      });

      const data = await response.json();

      if (data.ok) {
        setDrawResult(data);
        await loadEntries();
        toast({
          title: tr.successDraw,
          description: `Gagnant: ${data.winner?.name || data.winner?.email}`,
          variant: 'default',
        });
      } else {
        toast({
          title: tr.errorDraw,
          description: data.error || 'Erreur lors du tirage',
          variant: 'destructive',
        });
      }
    } catch (error) {
      console.error('Draw error:', error);
      toast({
        title: tr.errorDraw,
        description: 'Erreur serveur',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center"
        dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
      >
        <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
        <Card className="w-full max-w-md mx-4">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <LogIn className="w-5 h-5" />
              <span>{tr.loginTitle}</span>
            </CardTitle>
            <CardDescription>Accès réservé aux administrateurs</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <Label htmlFor="username">{tr.username}</Label>
                <Input
                  id="username"
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials({ ...credentials, username: e.target.value })}
                  required
                  className="mt-1"
                  placeholder={tr.username}
                />
              </div>
              <div>
                <Label htmlFor="password">{tr.password}</Label>
                <Input
                  id="password"
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                  required
                  className="mt-1"
                  placeholder={tr.password}
                />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? tr.loading : tr.login}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen bg-gray-50 dark:bg-gray-900"
      dir={currentLanguage === 'he' ? 'rtl' : 'ltr'}
    >
      <Header currentLanguage={currentLanguage} onLanguageChange={setLanguage} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">{tr.title}</h1>
          <Button onClick={handleLogout} variant="outline">
            <LogOut className="w-4 h-4 mr-2" />
            {tr.logout}
          </Button>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-6">
          {/* Participants Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Users className="w-5 h-5" />
                <span>{tr.participants}</span>
              </CardTitle>
              <CardDescription>{tr.totalParticipants}: {entries.length}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button onClick={loadEntries} variant="outline" className="w-full" disabled={isLoading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                {tr.refresh}
              </Button>
            </CardContent>
          </Card>

          {/* Draw Card */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Ticket className="w-5 h-5" />
                <span>{tr.drawButton}</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="drawName">{tr.drawName}</Label>
                <Input
                  id="drawName"
                  type="text"
                  value={drawName}
                  onChange={(e) => setDrawName(e.target.value)}
                  placeholder={tr.drawNamePlaceholder}
                  className="mt-1"
                />
              </div>
              <Button 
                onClick={handleDraw} 
                disabled={isLoading || entries.length === 0}
                className="w-full"
              >
                <Trophy className="w-4 h-4 mr-2" />
                {tr.drawButton}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Draw Result */}
        {drawResult && (
          <Card className="mb-6 bg-gradient-to-br from-yellow-50 to-orange-50 dark:from-yellow-900/20 dark:to-orange-900/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="w-5 h-5 text-yellow-600" />
                <span>{tr.drawResult}</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <p><strong>{tr.winner}:</strong> {drawResult.winner?.name || drawResult.winner?.email}</p>
                <p><strong>{tr.totalEntries}:</strong> {drawResult.totalEntries}</p>
                <p><strong>{tr.seed}:</strong> <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">{drawResult.seed}</code></p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Entries Table */}
        <Card>
          <CardHeader>
            <CardTitle>{tr.participants}</CardTitle>
            <CardDescription>{entries.length} {tr.totalParticipants}</CardDescription>
          </CardHeader>
          <CardContent>
            {entries.length === 0 ? (
              <p className="text-center text-gray-500 py-8">Aucun participant</p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>{tr.table.name}</TableHead>
                      <TableHead>{tr.table.email}</TableHead>
                      <TableHead>{tr.table.phone}</TableHead>
                      <TableHead>{tr.table.source}</TableHead>
                      <TableHead>{tr.table.date}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {entries.map((entry) => (
                      <TableRow key={entry.id}>
                        <TableCell>{entry.name || '-'}</TableCell>
                        <TableCell>{entry.email}</TableCell>
                        <TableCell>{entry.phone || '-'}</TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center space-x-1 ${
                            entry.source === 'shopify' ? 'text-blue-600' : 'text-green-600'
                          }`}>
                            {entry.source === 'shopify' ? (
                              <ShoppingBag className="w-4 h-4" />
                            ) : (
                              <FileText className="w-4 h-4" />
                            )}
                            <span>
                              {entry.source === 'shopify' ? tr.sourceShopify : tr.sourceForm}
                            </span>
                          </span>
                        </TableCell>
                        <TableCell>
                          {new Date(entry.created_at).toLocaleDateString()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
