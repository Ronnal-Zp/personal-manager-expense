export interface CategoryIcon {
    id:  string;
    cls: string;
}

/** Catálogo de iconos disponibles para una categoría (Font Awesome). */
export const CATEGORY_ICONS: readonly CategoryIcon[] = [
    { id: 'cart', cls: 'fa-solid fa-cart-shopping' },
    { id: 'utensils', cls: 'fa-solid fa-utensils' },
    { id: 'car', cls: 'fa-solid fa-car' },
    { id: 'bus', cls: 'fa-solid fa-bus' },
    { id: 'home', cls: 'fa-solid fa-house' },
    { id: 'bolt', cls: 'fa-solid fa-bolt' },
    { id: 'film', cls: 'fa-solid fa-film' },
    { id: 'gamepad', cls: 'fa-solid fa-gamepad' },
    { id: 'heart', cls: 'fa-solid fa-heart-pulse' },
    { id: 'dumbbell', cls: 'fa-solid fa-dumbbell' },
    { id: 'tag', cls: 'fa-solid fa-tag' },
    { id: 'wallet', cls: 'fa-solid fa-wallet' },
    { id: 'plane', cls: 'fa-solid fa-plane' },
    { id: 'book', cls: 'fa-solid fa-book' },
    { id: 'school', cls: 'fa-solid fa-graduation-cap' },
    { id: 'coffee', cls: 'fa-solid fa-mug-hot' },
    { id: 'gift', cls: 'fa-solid fa-gift' },
    { id: 'phone', cls: 'fa-solid fa-mobile-screen' },
    { id: 'pet', cls: 'fa-solid fa-paw' },
    { id: 'shirt', cls: 'fa-solid fa-shirt' },
    { id: 'piggy', cls: 'fa-solid fa-piggy-bank' },
    { id: 'receipt', cls: 'fa-solid fa-receipt' },
    { id: 'wifi', cls: 'fa-solid fa-wifi' },
    { id: 'baby', cls: 'fa-solid fa-baby-carriage' },
];

export const DEFAULT_ICON_ID = 'tag';
export const DEFAULT_ICON_CLASS = 'fa-solid fa-tag';

export function iconClassOf(iconId: string | null | undefined): string {
    return CATEGORY_ICONS.find(i => i.id === iconId)?.cls ?? DEFAULT_ICON_CLASS;
}

export interface CategoryPalette {
    id: string;
    /**
     * Tono sólido para puntos y barras de progreso. Es el valor que se persiste
     * en `color`, manteniendo la convención `bg-<tono>-400` que ya usan los
     * registros existentes y el resto de la aplicación (`app-category-progress`,
     * `app-transaction-item`).
     */
    solid: string;
    /** Tinte suave para fondos de badge, derivado del mismo tono. */
    soft:  string;
    /** Clase de texto, se persiste en `text_color`. */
    text:  string;
    /** Equivalente hexadecimal del tono `solid`, para usos fuera de Tailwind (ej. Chart.js). */
    hex: string;
}

/**
 * Las clases se declaran como literales para que Tailwind las detecte al
 * compilar el proyecto.
 */
export const CATEGORY_PALETTES: readonly CategoryPalette[] = [
    { id: 'blue', solid: 'bg-blue-400', soft: 'bg-blue-100', text: 'text-blue-800', hex: '#60a5fa' },
    { id: 'orange', solid: 'bg-orange-400', soft: 'bg-orange-100', text: 'text-orange-800', hex: '#fb923c' },
    { id: 'emerald', solid: 'bg-emerald-400', soft: 'bg-emerald-100', text: 'text-emerald-800', hex: '#34d399' },
    { id: 'pink', solid: 'bg-pink-400', soft: 'bg-pink-100', text: 'text-pink-800', hex: '#f472b6' },
    { id: 'violet', solid: 'bg-violet-400', soft: 'bg-violet-100', text: 'text-violet-800', hex: '#a78bfa' },
    { id: 'cyan', solid: 'bg-cyan-400', soft: 'bg-cyan-100', text: 'text-cyan-800', hex: '#22d3ee' },
    { id: 'amber', solid: 'bg-amber-400', soft: 'bg-amber-100', text: 'text-amber-800', hex: '#fbbf24' },
    { id: 'slate', solid: 'bg-slate-400', soft: 'bg-slate-100', text: 'text-slate-800', hex: '#94a3b8' },
];

export const DEFAULT_PALETTE = CATEGORY_PALETTES[0];

/**
 * Resuelve la paleta a partir del valor persistido en `color`. Las categorías
 * creadas antes de esta pantalla sólo guardan `color`, por lo que el tinte y el
 * color de texto se derivan de él cuando `text_color` viene vacío.
 */
export function paletteOf(color: string | null | undefined): CategoryPalette {
    return CATEGORY_PALETTES.find(p => p.solid === color) ?? DEFAULT_PALETTE;
}
