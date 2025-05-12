// Definição de tipos e interfaces para o aplicativo

export interface Product {
    id: string
    name: string
    price: number
    stock: number
    image_url?: string
    category: string
}

export interface CartItem extends Product {
    quantity: number
}

export interface Category {
    id: string
    name: string
}

export interface ConfigOption {
    id: string
    name: string
    icon: string
    action: () => void
}

// Paleta de cores baseada na identidade visual
export const COLORS = {
    primary: "#FF4924", // Cor principal (laranja/vermelho)
    black: "#060606", // Preto para fundos
    gray: "#CACACA", // Cinza para textos secundários
    darkGray: "#333333", // Cinza escuro para elementos
    lightGray: "#E5E5E5", // Cinza claro para divisores
    primaryLight: "#FF7A5E", // Versão mais clara da cor principal
    primaryDark: "#CC3A1D", // Versão mais escura da cor principal
    overlay: "rgba(6, 6, 6, 0.8)", // Overlay para modais
}
