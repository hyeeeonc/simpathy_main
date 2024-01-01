const IntroPage = () => {
  // 이미지 파일의 시작과 끝 번호
  const startNumber = 1
  const endNumber = 58

  // 이미지 파일의 경로를 생성하는 함수
  const getImageSrc = (number: number) =>
    `/images/webtoon/webtoon_page-${String(number).padStart(4, '0')}.jpg`

  // 이미지를 세로로 배열하여 출력
  const renderWebtoonImages = () => {
    const images = []
    for (let i = startNumber; i <= endNumber; i++) {
      const src = getImageSrc(i)
      images.push(<img key={i} src={src} alt={`Webtoon Image ${i}`} />)
    }
    return images
  }

  return (
    <div>
      <div className="text-sky-800 text-3xl font-bold my-[100px]">
        학습방법안내서
      </div>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {renderWebtoonImages()}
      </div>
    </div>
  )
}

export default IntroPage
