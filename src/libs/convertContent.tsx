const rex = /<img.*?src="(.*?)"[^>]+>/g

export const convertContent = (content: any) => {
  if (content) {
    return content
      .replace(/<[^>]+>/g, '')
      .replace(/&(nbsp|amp|quot|lt|gt|ldquo|rdquo);/g, '')
  }
}

export const convertImages = (content: any) => {
  // const route = useRouter()
  if (content) {
    const urls = []
    let m: RegExpExecArray | null
    while ((m = rex.exec(content))) {
      if (m[1] != '') {
        urls.push(m[1])
        continue
      }
    }
    if (urls[0]) return urls[0]
  }

  return `/default/538.svg`
}
