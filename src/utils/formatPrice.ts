export function formatPrice(price: string){
    return Intl.NumberFormat("pt-BR" , {
        style: "currency",
        currency: "BRL"
    }).format(Number(price) * 1000)
}