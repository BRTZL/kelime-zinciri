export type SiteConfig = {
  name: string
  description: string
  url: string
  links: {
    personal: string
    github: string
  }
}

export const siteConfig: SiteConfig = {
  name: "Kelime Zinciri",
  description:
    "Kelime Zinciri, kelime oyunlarındaki kelimelerin birbirine bağlanarak oluşturduğu zincirlerin listelendiği bir web uygulamasıdır.",
  url: "https://kelimezinciri.bartuozel.com",
  links: {
    personal: "https://bartuozel.com",
    github: "https://github.com/BRTZL/kelime-zinciri",
  },
}
