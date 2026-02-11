import { useState, useMemo } from 'react';
import { Header } from '@/components/Header';
import { useLanguage } from '@/contexts/LanguageContext';
import { realBreslovProducts } from '@/data/realProducts';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import {
  Package,
  PlusCircle,
  ShoppingCart,
  DollarSign,
  Pencil,
  Trash2,
  Search,
  Save,
  CheckCircle,
  Clock,
  Truck,
  XCircle,
  AlertCircle,
  RotateCcw,
} from 'lucide-react';
import type { Product, ProductVariant } from '../../../shared/schema';

// ─── Admin translations ────────────────────────────────────────────────────────
const adminTranslations = {
  he: {
    pageTitle: 'לוח בקרה - ניהול',
    pageSubtitle: 'ניהול מוצרים, הזמנות ומחירים',
    tabProducts: 'מוצרים',
    tabAddProduct: 'הוספת מוצר',
    tabOrders: 'הזמנות',
    tabBulkEdit: 'עדכון מחירים',
    // Products tab
    searchProducts: 'חיפוש מוצרים...',
    productName: 'שם מוצר',
    category: 'קטגוריה',
    variants: 'וריאנטים',
    stock: 'מלאי',
    price: 'מחיר',
    actions: 'פעולות',
    edit: 'עריכה',
    delete: 'מחיקה',
    inStock: 'במלאי',
    outOfStock: 'אזל',
    totalProducts: 'סה"כ מוצרים',
    totalVariants: 'סה"כ וריאנטים',
    lowStock: 'מלאי נמוך',
    // Add product tab
    addNewProduct: 'הוספת ספר חדש',
    bookName: 'שם הספר (עברית)',
    bookNameEn: 'שם הספר (אנגלית)',
    description: 'תיאור',
    author: 'מחבר',
    publisher: 'מוציא לאור',
    language: 'שפה',
    pages: 'מספר עמודים',
    isbn: 'ISBN',
    saveProduct: 'שמור מוצר',
    productSaved: 'המוצר נשמר בהצלחה!',
    // Variant fields
    addVariant: 'הוסף וריאנט',
    format: 'פורמט',
    binding: 'כריכה',
    size: 'גודל',
    dimensions: 'מידות',
    volumes: 'כרכים',
    stockQuantity: 'כמות במלאי',
    // Orders tab
    orderId: 'מספר הזמנה',
    customer: 'לקוח',
    date: 'תאריך',
    status: 'סטטוס',
    total: 'סה"כ',
    noOrders: 'אין הזמנות להצגה',
    orderStatusPending: 'ממתין',
    orderStatusProcessing: 'בטיפול',
    orderStatusShipped: 'נשלח',
    orderStatusDelivered: 'נמסר',
    orderStatusCanceled: 'בוטל',
    orderStatusRefunded: 'הוחזר',
    totalOrders: 'סה"כ הזמנות',
    pendingOrders: 'ממתינות',
    shippedOrders: 'נשלחו',
    // Bulk edit tab
    bulkPriceUpdate: 'עדכון מחירים בכמות',
    selectCategory: 'בחר קטגוריה',
    allCategories: 'כל הקטגוריות',
    adjustmentType: 'סוג שינוי',
    percentage: 'אחוז',
    fixedAmount: 'סכום קבוע',
    adjustmentValue: 'ערך השינוי',
    increase: 'העלאה',
    decrease: 'הורדה',
    preview: 'תצוגה מקדימה',
    applyChanges: 'החל שינויים',
    currentPrice: 'מחיר נוכחי',
    newPrice: 'מחיר חדש',
    change: 'שינוי',
    noProductsMatch: 'אין מוצרים תואמים',
    bulkUpdateApplied: 'המחירים עודכנו בהצלחה!',
    shekel: '₪',
  },
  en: {
    pageTitle: 'Admin Dashboard',
    pageSubtitle: 'Manage products, orders, and pricing',
    tabProducts: 'Products',
    tabAddProduct: 'Add Product',
    tabOrders: 'Orders',
    tabBulkEdit: 'Bulk Edit',
    searchProducts: 'Search products...',
    productName: 'Product Name',
    category: 'Category',
    variants: 'Variants',
    stock: 'Stock',
    price: 'Price',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    inStock: 'In Stock',
    outOfStock: 'Out of Stock',
    totalProducts: 'Total Products',
    totalVariants: 'Total Variants',
    lowStock: 'Low Stock',
    addNewProduct: 'Add New Book',
    bookName: 'Book Name (Hebrew)',
    bookNameEn: 'Book Name (English)',
    description: 'Description',
    author: 'Author',
    publisher: 'Publisher',
    language: 'Language',
    pages: 'Pages',
    isbn: 'ISBN',
    saveProduct: 'Save Product',
    productSaved: 'Product saved successfully!',
    addVariant: 'Add Variant',
    format: 'Format',
    binding: 'Binding',
    size: 'Size',
    dimensions: 'Dimensions',
    volumes: 'Volumes',
    stockQuantity: 'Stock Qty',
    orderId: 'Order ID',
    customer: 'Customer',
    date: 'Date',
    status: 'Status',
    total: 'Total',
    noOrders: 'No orders to display',
    orderStatusPending: 'Pending',
    orderStatusProcessing: 'Processing',
    orderStatusShipped: 'Shipped',
    orderStatusDelivered: 'Delivered',
    orderStatusCanceled: 'Canceled',
    orderStatusRefunded: 'Refunded',
    totalOrders: 'Total Orders',
    pendingOrders: 'Pending',
    shippedOrders: 'Shipped',
    bulkPriceUpdate: 'Bulk Price Update',
    selectCategory: 'Select Category',
    allCategories: 'All Categories',
    adjustmentType: 'Adjustment Type',
    percentage: 'Percentage',
    fixedAmount: 'Fixed Amount',
    adjustmentValue: 'Adjustment Value',
    increase: 'Increase',
    decrease: 'Decrease',
    preview: 'Preview',
    applyChanges: 'Apply Changes',
    currentPrice: 'Current Price',
    newPrice: 'New Price',
    change: 'Change',
    noProductsMatch: 'No matching products',
    bulkUpdateApplied: 'Prices updated successfully!',
    shekel: '₪',
  },
  fr: {
    pageTitle: 'Tableau de Bord Admin',
    pageSubtitle: 'Gestion des produits, commandes et prix',
    tabProducts: 'Produits',
    tabAddProduct: 'Ajouter',
    tabOrders: 'Commandes',
    tabBulkEdit: 'Prix en masse',
    searchProducts: 'Rechercher des produits...',
    productName: 'Nom du produit',
    category: 'Categorie',
    variants: 'Variantes',
    stock: 'Stock',
    price: 'Prix',
    actions: 'Actions',
    edit: 'Modifier',
    delete: 'Supprimer',
    inStock: 'En stock',
    outOfStock: 'Rupture',
    totalProducts: 'Total produits',
    totalVariants: 'Total variantes',
    lowStock: 'Stock faible',
    addNewProduct: 'Ajouter un livre',
    bookName: 'Nom du livre (Hebreu)',
    bookNameEn: 'Nom du livre (Anglais)',
    description: 'Description',
    author: 'Auteur',
    publisher: 'Editeur',
    language: 'Langue',
    pages: 'Pages',
    isbn: 'ISBN',
    saveProduct: 'Enregistrer',
    productSaved: 'Produit enregistre!',
    addVariant: 'Ajouter variante',
    format: 'Format',
    binding: 'Reliure',
    size: 'Taille',
    dimensions: 'Dimensions',
    volumes: 'Volumes',
    stockQuantity: 'Qte stock',
    orderId: 'N commande',
    customer: 'Client',
    date: 'Date',
    status: 'Statut',
    total: 'Total',
    noOrders: 'Aucune commande',
    orderStatusPending: 'En attente',
    orderStatusProcessing: 'En cours',
    orderStatusShipped: 'Expedie',
    orderStatusDelivered: 'Livre',
    orderStatusCanceled: 'Annule',
    orderStatusRefunded: 'Rembourse',
    totalOrders: 'Total commandes',
    pendingOrders: 'En attente',
    shippedOrders: 'Expedies',
    bulkPriceUpdate: 'Mise a jour prix en masse',
    selectCategory: 'Choisir categorie',
    allCategories: 'Toutes',
    adjustmentType: 'Type d\'ajustement',
    percentage: 'Pourcentage',
    fixedAmount: 'Montant fixe',
    adjustmentValue: 'Valeur',
    increase: 'Augmenter',
    decrease: 'Diminuer',
    preview: 'Apercu',
    applyChanges: 'Appliquer',
    currentPrice: 'Prix actuel',
    newPrice: 'Nouveau prix',
    change: 'Variation',
    noProductsMatch: 'Aucun produit correspondant',
    bulkUpdateApplied: 'Prix mis a jour!',
    shekel: '₪',
  },
  es: {
    pageTitle: 'Panel de Administracion',
    pageSubtitle: 'Gestionar productos, pedidos y precios',
    tabProducts: 'Productos',
    tabAddProduct: 'Agregar',
    tabOrders: 'Pedidos',
    tabBulkEdit: 'Precios masivos',
    searchProducts: 'Buscar productos...',
    productName: 'Nombre',
    category: 'Categoria',
    variants: 'Variantes',
    stock: 'Stock',
    price: 'Precio',
    actions: 'Acciones',
    edit: 'Editar',
    delete: 'Eliminar',
    inStock: 'En stock',
    outOfStock: 'Agotado',
    totalProducts: 'Total productos',
    totalVariants: 'Total variantes',
    lowStock: 'Stock bajo',
    addNewProduct: 'Agregar libro',
    bookName: 'Nombre (Hebreo)',
    bookNameEn: 'Nombre (Ingles)',
    description: 'Descripcion',
    author: 'Autor',
    publisher: 'Editorial',
    language: 'Idioma',
    pages: 'Paginas',
    isbn: 'ISBN',
    saveProduct: 'Guardar',
    productSaved: 'Producto guardado!',
    addVariant: 'Agregar variante',
    format: 'Formato',
    binding: 'Encuadernacion',
    size: 'Tamano',
    dimensions: 'Dimensiones',
    volumes: 'Volumenes',
    stockQuantity: 'Cant. stock',
    orderId: 'N pedido',
    customer: 'Cliente',
    date: 'Fecha',
    status: 'Estado',
    total: 'Total',
    noOrders: 'Sin pedidos',
    orderStatusPending: 'Pendiente',
    orderStatusProcessing: 'Procesando',
    orderStatusShipped: 'Enviado',
    orderStatusDelivered: 'Entregado',
    orderStatusCanceled: 'Cancelado',
    orderStatusRefunded: 'Reembolsado',
    totalOrders: 'Total pedidos',
    pendingOrders: 'Pendientes',
    shippedOrders: 'Enviados',
    bulkPriceUpdate: 'Actualizacion masiva de precios',
    selectCategory: 'Elegir categoria',
    allCategories: 'Todas',
    adjustmentType: 'Tipo de ajuste',
    percentage: 'Porcentaje',
    fixedAmount: 'Monto fijo',
    adjustmentValue: 'Valor',
    increase: 'Aumento',
    decrease: 'Descuento',
    preview: 'Vista previa',
    applyChanges: 'Aplicar',
    currentPrice: 'Precio actual',
    newPrice: 'Nuevo precio',
    change: 'Cambio',
    noProductsMatch: 'Sin coincidencias',
    bulkUpdateApplied: 'Precios actualizados!',
    shekel: '₪',
  },
  ru: {
    pageTitle: 'Панель управления',
    pageSubtitle: 'Управление товарами, заказами и ценами',
    tabProducts: 'Товары',
    tabAddProduct: 'Добавить',
    tabOrders: 'Заказы',
    tabBulkEdit: 'Цены',
    searchProducts: 'Поиск товаров...',
    productName: 'Название',
    category: 'Категория',
    variants: 'Варианты',
    stock: 'Склад',
    price: 'Цена',
    actions: 'Действия',
    edit: 'Редактировать',
    delete: 'Удалить',
    inStock: 'В наличии',
    outOfStock: 'Нет в наличии',
    totalProducts: 'Всего товаров',
    totalVariants: 'Всего вариантов',
    lowStock: 'Мало на складе',
    addNewProduct: 'Добавить книгу',
    bookName: 'Название (Иврит)',
    bookNameEn: 'Название (Англ.)',
    description: 'Описание',
    author: 'Автор',
    publisher: 'Издатель',
    language: 'Язык',
    pages: 'Страницы',
    isbn: 'ISBN',
    saveProduct: 'Сохранить',
    productSaved: 'Товар сохранен!',
    addVariant: 'Добавить вариант',
    format: 'Формат',
    binding: 'Переплет',
    size: 'Размер',
    dimensions: 'Размеры',
    volumes: 'Тома',
    stockQuantity: 'Кол-во',
    orderId: 'N заказа',
    customer: 'Клиент',
    date: 'Дата',
    status: 'Статус',
    total: 'Итого',
    noOrders: 'Нет заказов',
    orderStatusPending: 'Ожидание',
    orderStatusProcessing: 'В обработке',
    orderStatusShipped: 'Отправлен',
    orderStatusDelivered: 'Доставлен',
    orderStatusCanceled: 'Отменен',
    orderStatusRefunded: 'Возврат',
    totalOrders: 'Всего заказов',
    pendingOrders: 'Ожидают',
    shippedOrders: 'Отправлены',
    bulkPriceUpdate: 'Массовое обновление цен',
    selectCategory: 'Выбрать категорию',
    allCategories: 'Все',
    adjustmentType: 'Тип изменения',
    percentage: 'Процент',
    fixedAmount: 'Фиксированная сумма',
    adjustmentValue: 'Значение',
    increase: 'Увеличить',
    decrease: 'Уменьшить',
    preview: 'Предпросмотр',
    applyChanges: 'Применить',
    currentPrice: 'Текущая цена',
    newPrice: 'Новая цена',
    change: 'Изменение',
    noProductsMatch: 'Нет совпадений',
    bulkUpdateApplied: 'Цены обновлены!',
    shekel: '₪',
  },
};

type AdminLang = keyof typeof adminTranslations;

// ─── Helper: get translation ─────────────────────────────────────────────────
function useAdminT(lang: string) {
  const translations = adminTranslations[lang as AdminLang] || adminTranslations.he;
  return (key: keyof typeof adminTranslations.he) =>
    translations[key] || adminTranslations.he[key] || key;
}

// ─── Mock orders for skeleton (will be replaced with real API data) ──────────
const mockOrders = [
  {
    id: 'KRI-ORD-001',
    email: 'moshe@example.com',
    customerName: 'משה כהן',
    status: 'pending' as const,
    totalAmount: 15500,
    createdAt: '2026-02-10T14:30:00Z',
    items: 2,
  },
  {
    id: 'KRI-ORD-002',
    email: 'sarah@example.com',
    customerName: 'שרה לוי',
    status: 'processing' as const,
    totalAmount: 9500,
    createdAt: '2026-02-09T10:15:00Z',
    items: 1,
  },
  {
    id: 'KRI-ORD-003',
    email: 'david@example.com',
    customerName: 'דוד ישראלי',
    status: 'shipped' as const,
    totalAmount: 28000,
    createdAt: '2026-02-07T18:45:00Z',
    items: 4,
  },
  {
    id: 'KRI-ORD-004',
    email: 'rivka@example.com',
    customerName: 'רבקה פרידמן',
    status: 'delivered' as const,
    totalAmount: 5500,
    createdAt: '2026-02-05T09:00:00Z',
    items: 1,
  },
  {
    id: 'KRI-ORD-005',
    email: 'yosef@example.com',
    customerName: 'יוסף אברהם',
    status: 'canceled' as const,
    totalAmount: 12000,
    createdAt: '2026-02-04T16:20:00Z',
    items: 3,
  },
];

// ─── Status badge helpers ────────────────────────────────────────────────────
const statusIcons: Record<string, React.ReactNode> = {
  pending: <Clock className="w-3.5 h-3.5" />,
  processing: <RotateCcw className="w-3.5 h-3.5" />,
  shipped: <Truck className="w-3.5 h-3.5" />,
  delivered: <CheckCircle className="w-3.5 h-3.5" />,
  canceled: <XCircle className="w-3.5 h-3.5" />,
  refunded: <AlertCircle className="w-3.5 h-3.5" />,
};

const statusColors: Record<string, string> = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-300',
  processing: 'bg-blue-100 text-blue-800 border-blue-300',
  shipped: 'bg-purple-100 text-purple-800 border-purple-300',
  delivered: 'bg-green-100 text-green-800 border-green-300',
  canceled: 'bg-red-100 text-red-800 border-red-300',
  refunded: 'bg-gray-100 text-gray-800 border-gray-300',
};

// ─── Products Tab ────────────────────────────────────────────────────────────
function ProductsTab({ t, isRTL }: { t: (k: keyof typeof adminTranslations.he) => string; isRTL: boolean }) {
  const [searchQuery, setSearchQuery] = useState('');
  const allProducts = Object.values(realBreslovProducts);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return allProducts;
    const q = searchQuery.toLowerCase();
    return allProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.nameEnglish && p.nameEnglish.toLowerCase().includes(q)) ||
        p.category.toLowerCase().includes(q)
    );
  }, [searchQuery, allProducts]);

  const stats = useMemo(() => {
    let totalVariants = 0;
    let lowStockCount = 0;
    allProducts.forEach((p) => {
      const vars = p.variants as ProductVariant[] | undefined;
      if (vars) {
        totalVariants += vars.length;
        vars.forEach((v) => {
          if (v.stockQuantity !== undefined && v.stockQuantity < 5) lowStockCount++;
        });
      }
    });
    return { totalProducts: allProducts.length, totalVariants, lowStockCount };
  }, [allProducts]);

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#FF6B00]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('totalProducts')}</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalProducts}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center">
            <Package className="w-6 h-6 text-[#2563EB]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('totalVariants')}</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalVariants}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('lowStock')}</p>
            <p className="text-2xl font-bold text-gray-900">{stats.lowStockCount}</p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className={`absolute top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 ${isRTL ? 'right-3' : 'left-3'}`} />
        <Input
          placeholder={t('searchProducts')}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className={isRTL ? 'pr-10' : 'pl-10'}
        />
      </div>

      {/* Product table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className={`p-3 font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t('productName')}</th>
              <th className={`p-3 font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t('category')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('variants')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('stock')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('price')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => {
              const vars = (product.variants as ProductVariant[] | undefined) || [];
              const minPrice = vars.length ? Math.min(...vars.map((v) => v.price)) : 0;
              const maxPrice = vars.length ? Math.max(...vars.map((v) => v.price)) : 0;
              const totalStock = vars.reduce((sum, v) => sum + (v.stockQuantity || 0), 0);
              const allInStock = vars.every((v) => v.inStock);

              return (
                <tr key={product.id} className="border-b hover:bg-orange-50/30 transition-colors">
                  <td className={`p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="font-medium text-gray-900">{product.name}</div>
                    {product.nameEnglish && (
                      <div className="text-xs text-gray-400">{product.nameEnglish}</div>
                    )}
                  </td>
                  <td className={`p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <Badge variant="outline" className="text-xs">
                      {product.category}
                    </Badge>
                  </td>
                  <td className="p-3 text-center text-gray-700">{vars.length}</td>
                  <td className="p-3 text-center">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${
                        allInStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                      }`}
                    >
                      {totalStock} {allInStock ? t('inStock') : t('outOfStock')}
                    </span>
                  </td>
                  <td className="p-3 text-center text-gray-700 font-medium">
                    {minPrice === maxPrice
                      ? `${minPrice}${t('shekel')}`
                      : `${minPrice}-${maxPrice}${t('shekel')}`}
                  </td>
                  <td className="p-3 text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-[#2563EB] hover:bg-blue-50">
                        <Pencil className="w-4 h-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Add Product Tab ──────────────────────────────────────────────────────────
function AddProductTab({ t, isRTL }: { t: (k: keyof typeof adminTranslations.he) => string; isRTL: boolean }) {
  const [saved, setSaved] = useState(false);
  const [formVariants, setFormVariants] = useState<
    Array<{ format: string; binding: string; size: string; dimensions: string; volumes: number; price: number; stockQuantity: number }>
  >([{ format: '', binding: '', size: '', dimensions: '', volumes: 1, price: 0, stockQuantity: 0 }]);

  const addVariant = () => {
    setFormVariants((prev) => [
      ...prev,
      { format: '', binding: '', size: '', dimensions: '', volumes: 1, price: 0, stockQuantity: 0 },
    ]);
  };

  const updateVariant = (index: number, field: string, value: string | number) => {
    setFormVariants((prev) => {
      const copy = [...prev];
      copy[index] = { ...copy[index], [field]: value };
      return copy;
    });
  };

  const removeVariant = (index: number) => {
    if (formVariants.length <= 1) return;
    setFormVariants((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Send to API
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="space-y-6 max-w-3xl">
      <h2 className="text-xl font-bold text-gray-900">{t('addNewProduct')}</h2>

      {saved && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          {t('productSaved')}
        </div>
      )}

      {/* Basic fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>{t('bookName')}</Label>
          <Input required dir="rtl" placeholder="ליקוטי מוהר&quot;ן" />
        </div>
        <div className="space-y-2">
          <Label>{t('bookNameEn')}</Label>
          <Input placeholder="Likutei Moharan" dir="ltr" />
        </div>
      </div>

      <div className="space-y-2">
        <Label>{t('description')}</Label>
        <Textarea dir={isRTL ? 'rtl' : 'ltr'} rows={3} placeholder="..." />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>{t('category')}</Label>
          <Input dir="rtl" placeholder="ספרי רבינו" />
        </div>
        <div className="space-y-2">
          <Label>{t('author')}</Label>
          <Input dir="rtl" defaultValue="רבי נחמן מברסלב" />
        </div>
        <div className="space-y-2">
          <Label>{t('publisher')}</Label>
          <Input dir="rtl" defaultValue="קרן רבי ישראל" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label>{t('language')}</Label>
          <Input dir="rtl" defaultValue="עברית" />
        </div>
        <div className="space-y-2">
          <Label>{t('pages')}</Label>
          <Input type="number" min={1} placeholder="320" />
        </div>
        <div className="space-y-2">
          <Label>{t('isbn')}</Label>
          <Input placeholder="978-965-7023-XX-X" dir="ltr" />
        </div>
      </div>

      {/* Variants */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-gray-800">{t('variants')}</h3>
          <Button type="button" variant="outline" size="sm" onClick={addVariant}>
            <PlusCircle className="w-4 h-4" />
            {t('addVariant')}
          </Button>
        </div>

        {formVariants.map((variant, idx) => (
          <div key={idx} className="border border-gray-200 rounded-lg p-4 bg-gray-50 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-600">
                {t('variants')} #{idx + 1}
              </span>
              {formVariants.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 text-red-400 hover:text-red-600"
                  onClick={() => removeVariant(idx)}
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              )}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              <div className="space-y-1">
                <Label className="text-xs">{t('format')}</Label>
                <Input
                  value={variant.format}
                  onChange={(e) => updateVariant(idx, 'format', e.target.value)}
                  dir="rtl"
                  placeholder="סקאי"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('binding')}</Label>
                <Input
                  value={variant.binding}
                  onChange={(e) => updateVariant(idx, 'binding', e.target.value)}
                  dir="rtl"
                  placeholder="קשה"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('size')}</Label>
                <Input
                  value={variant.size}
                  onChange={(e) => updateVariant(idx, 'size', e.target.value)}
                  dir="rtl"
                  placeholder="גדול"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('dimensions')}</Label>
                <Input
                  value={variant.dimensions}
                  onChange={(e) => updateVariant(idx, 'dimensions', e.target.value)}
                  dir="ltr"
                  placeholder="24*17"
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('volumes')}</Label>
                <Input
                  type="number"
                  min={1}
                  value={variant.volumes}
                  onChange={(e) => updateVariant(idx, 'volumes', parseInt(e.target.value) || 1)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('price')} ({t('shekel')})</Label>
                <Input
                  type="number"
                  min={0}
                  value={variant.price || ''}
                  onChange={(e) => updateVariant(idx, 'price', parseInt(e.target.value) || 0)}
                  className="h-9 text-sm"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs">{t('stockQuantity')}</Label>
                <Input
                  type="number"
                  min={0}
                  value={variant.stockQuantity || ''}
                  onChange={(e) => updateVariant(idx, 'stockQuantity', parseInt(e.target.value) || 0)}
                  className="h-9 text-sm"
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      <Button type="submit" className="bg-[#FF6B00] hover:bg-[#e55a00] text-white">
        <Save className="w-4 h-4" />
        {t('saveProduct')}
      </Button>
    </form>
  );
}

// ─── Orders Tab ──────────────────────────────────────────────────────────────
function OrdersTab({ t, isRTL }: { t: (k: keyof typeof adminTranslations.he) => string; isRTL: boolean }) {
  const [filterStatus, setFilterStatus] = useState<string>('all');

  const filteredOrders = useMemo(() => {
    if (filterStatus === 'all') return mockOrders;
    return mockOrders.filter((o) => o.status === filterStatus);
  }, [filterStatus]);

  const statusLabel = (status: string) => {
    const map: Record<string, keyof typeof adminTranslations.he> = {
      pending: 'orderStatusPending',
      processing: 'orderStatusProcessing',
      shipped: 'orderStatusShipped',
      delivered: 'orderStatusDelivered',
      canceled: 'orderStatusCanceled',
      refunded: 'orderStatusRefunded',
    };
    return t(map[status] || 'orderStatusPending');
  };

  const orderStats = useMemo(() => {
    return {
      total: mockOrders.length,
      pending: mockOrders.filter((o) => o.status === 'pending').length,
      shipped: mockOrders.filter((o) => o.status === 'shipped').length,
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center">
            <ShoppingCart className="w-6 h-6 text-[#FF6B00]" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('totalOrders')}</p>
            <p className="text-2xl font-bold text-gray-900">{orderStats.total}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-yellow-100 flex items-center justify-center">
            <Clock className="w-6 h-6 text-yellow-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('pendingOrders')}</p>
            <p className="text-2xl font-bold text-gray-900">{orderStats.pending}</p>
          </div>
        </div>
        <div className="bg-white rounded-xl border border-gray-200 p-4 flex items-center gap-4 shadow-sm">
          <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center">
            <Truck className="w-6 h-6 text-purple-600" />
          </div>
          <div>
            <p className="text-sm text-gray-500">{t('shippedOrders')}</p>
            <p className="text-2xl font-bold text-gray-900">{orderStats.shipped}</p>
          </div>
        </div>
      </div>

      {/* Status filter */}
      <div className="flex flex-wrap gap-2">
        {['all', 'pending', 'processing', 'shipped', 'delivered', 'canceled'].map((s) => (
          <button
            key={s}
            onClick={() => setFilterStatus(s)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              filterStatus === s
                ? 'bg-[#FF6B00] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {s === 'all' ? (isRTL ? 'הכל' : 'All') : statusLabel(s)}
          </button>
        ))}
      </div>

      {/* Orders table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-gray-50">
              <th className={`p-3 font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t('orderId')}</th>
              <th className={`p-3 font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t('customer')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('date')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('status')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('total')}</th>
              <th className="p-3 font-semibold text-gray-600 text-center">{t('actions')}</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.length === 0 ? (
              <tr>
                <td colSpan={6} className="p-8 text-center text-gray-400">
                  {t('noOrders')}
                </td>
              </tr>
            ) : (
              filteredOrders.map((order) => (
                <tr key={order.id} className="border-b hover:bg-orange-50/30 transition-colors">
                  <td className={`p-3 font-mono text-xs ${isRTL ? 'text-right' : 'text-left'}`}>{order.id}</td>
                  <td className={`p-3 ${isRTL ? 'text-right' : 'text-left'}`}>
                    <div className="font-medium text-gray-900">{order.customerName}</div>
                    <div className="text-xs text-gray-400">{order.email}</div>
                  </td>
                  <td className="p-3 text-center text-gray-600">
                    {new Date(order.createdAt).toLocaleDateString(isRTL ? 'he-IL' : 'en-US')}
                  </td>
                  <td className="p-3 text-center">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border ${statusColors[order.status]}`}>
                      {statusIcons[order.status]}
                      {statusLabel(order.status)}
                    </span>
                  </td>
                  <td className="p-3 text-center font-medium text-gray-900">
                    {(order.totalAmount / 100).toFixed(0)}{t('shekel')}
                  </td>
                  <td className="p-3 text-center">
                    <Button variant="ghost" size="sm" className="text-[#2563EB] hover:bg-blue-50 text-xs">
                      <Pencil className="w-3.5 h-3.5" />
                      {t('edit')}
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// ─── Bulk Price Edit Tab ─────────────────────────────────────────────────────
function BulkEditTab({ t, isRTL }: { t: (k: keyof typeof adminTranslations.he) => string; isRTL: boolean }) {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [adjustType, setAdjustType] = useState<'percentage' | 'fixed'>('percentage');
  const [direction, setDirection] = useState<'increase' | 'decrease'>('increase');
  const [adjustValue, setAdjustValue] = useState(10);
  const [showPreview, setShowPreview] = useState(false);
  const [applied, setApplied] = useState(false);

  const allProducts = Object.values(realBreslovProducts);

  const categories = useMemo(() => {
    const cats = new Set<string>();
    allProducts.forEach((p) => cats.add(p.category));
    return Array.from(cats);
  }, [allProducts]);

  const affectedProducts = useMemo(() => {
    if (selectedCategory === 'all') return allProducts;
    return allProducts.filter((p) => p.category === selectedCategory);
  }, [selectedCategory, allProducts]);

  const calculateNewPrice = (price: number) => {
    if (adjustType === 'percentage') {
      const factor = direction === 'increase' ? 1 + adjustValue / 100 : 1 - adjustValue / 100;
      return Math.max(0, Math.round(price * factor));
    }
    return direction === 'increase' ? price + adjustValue : Math.max(0, price - adjustValue);
  };

  const handleApply = () => {
    // TODO: Send to API
    setApplied(true);
    setTimeout(() => setApplied(false), 3000);
  };

  return (
    <div className="space-y-6 max-w-4xl">
      <h2 className="text-xl font-bold text-gray-900">{t('bulkPriceUpdate')}</h2>

      {applied && (
        <div className="bg-green-50 border border-green-200 rounded-lg p-3 flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          {t('bulkUpdateApplied')}
        </div>
      )}

      {/* Controls */}
      <div className="bg-white rounded-xl border border-gray-200 p-5 shadow-sm space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          {/* Category filter */}
          <div className="space-y-2">
            <Label>{t('selectCategory')}</Label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm"
              dir={isRTL ? 'rtl' : 'ltr'}
            >
              <option value="all">{t('allCategories')}</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Adjustment type */}
          <div className="space-y-2">
            <Label>{t('adjustmentType')}</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setAdjustType('percentage')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  adjustType === 'percentage'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                %
              </button>
              <button
                type="button"
                onClick={() => setAdjustType('fixed')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  adjustType === 'fixed'
                    ? 'bg-[#2563EB] text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('shekel')}
              </button>
            </div>
          </div>

          {/* Direction */}
          <div className="space-y-2">
            <Label>{t('change')}</Label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setDirection('increase')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  direction === 'increase'
                    ? 'bg-green-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('increase')}
              </button>
              <button
                type="button"
                onClick={() => setDirection('decrease')}
                className={`flex-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  direction === 'decrease'
                    ? 'bg-red-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {t('decrease')}
              </button>
            </div>
          </div>

          {/* Value */}
          <div className="space-y-2">
            <Label>{t('adjustmentValue')}</Label>
            <Input
              type="number"
              min={0}
              value={adjustValue}
              onChange={(e) => setAdjustValue(parseInt(e.target.value) || 0)}
            />
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={() => setShowPreview(!showPreview)}
          >
            {t('preview')} ({affectedProducts.length})
          </Button>
          <Button
            type="button"
            className="bg-[#FF6B00] hover:bg-[#e55a00] text-white"
            onClick={handleApply}
          >
            <DollarSign className="w-4 h-4" />
            {t('applyChanges')}
          </Button>
        </div>
      </div>

      {/* Preview table */}
      {showPreview && (
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className={`p-3 font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t('productName')}</th>
                <th className={`p-3 font-semibold text-gray-600 ${isRTL ? 'text-right' : 'text-left'}`}>{t('variants')}</th>
                <th className="p-3 font-semibold text-gray-600 text-center">{t('currentPrice')}</th>
                <th className="p-3 font-semibold text-gray-600 text-center">{t('newPrice')}</th>
                <th className="p-3 font-semibold text-gray-600 text-center">{t('change')}</th>
              </tr>
            </thead>
            <tbody>
              {affectedProducts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-gray-400">
                    {t('noProductsMatch')}
                  </td>
                </tr>
              ) : (
                affectedProducts.flatMap((product) => {
                  const vars = (product.variants as ProductVariant[] | undefined) || [];
                  return vars.map((v, idx) => {
                    const newPrice = calculateNewPrice(v.price);
                    const diff = newPrice - v.price;
                    return (
                      <tr key={`${product.id}-${v.id}`} className="border-b hover:bg-orange-50/30 transition-colors">
                        {idx === 0 && (
                          <td
                            className={`p-3 ${isRTL ? 'text-right' : 'text-left'} font-medium`}
                            rowSpan={vars.length}
                          >
                            {product.name}
                          </td>
                        )}
                        <td className={`p-3 ${isRTL ? 'text-right' : 'text-left'} text-gray-600`}>
                          {v.format} / {v.size}
                        </td>
                        <td className="p-3 text-center text-gray-500">
                          {v.price}{t('shekel')}
                        </td>
                        <td className="p-3 text-center font-semibold text-gray-900">
                          {newPrice}{t('shekel')}
                        </td>
                        <td className={`p-3 text-center font-medium ${diff >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {diff >= 0 ? '+' : ''}{diff}{t('shekel')}
                        </td>
                      </tr>
                    );
                  });
                })
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

// ─── Main Admin Page ─────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const { currentLanguage } = useLanguage();
  const isRTL = currentLanguage === 'he';
  const t = useAdminT(currentLanguage);

  return (
    <div dir={isRTL ? 'rtl' : 'ltr'} className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">{t('pageTitle')}</h1>
          <p className="mt-1 text-gray-500">{t('pageSubtitle')}</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="products" dir={isRTL ? 'rtl' : 'ltr'}>
          <TabsList className="bg-white border border-gray-200 shadow-sm mb-6 flex-wrap h-auto gap-1 p-1.5">
            <TabsTrigger
              value="products"
              className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white gap-1.5"
            >
              <Package className="w-4 h-4" />
              {t('tabProducts')}
            </TabsTrigger>
            <TabsTrigger
              value="add-product"
              className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white gap-1.5"
            >
              <PlusCircle className="w-4 h-4" />
              {t('tabAddProduct')}
            </TabsTrigger>
            <TabsTrigger
              value="orders"
              className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white gap-1.5"
            >
              <ShoppingCart className="w-4 h-4" />
              {t('tabOrders')}
            </TabsTrigger>
            <TabsTrigger
              value="bulk-edit"
              className="data-[state=active]:bg-[#FF6B00] data-[state=active]:text-white gap-1.5"
            >
              <DollarSign className="w-4 h-4" />
              {t('tabBulkEdit')}
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            <ProductsTab t={t} isRTL={isRTL} />
          </TabsContent>

          <TabsContent value="add-product">
            <AddProductTab t={t} isRTL={isRTL} />
          </TabsContent>

          <TabsContent value="orders">
            <OrdersTab t={t} isRTL={isRTL} />
          </TabsContent>

          <TabsContent value="bulk-edit">
            <BulkEditTab t={t} isRTL={isRTL} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
