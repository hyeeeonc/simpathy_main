'use client'

import styled from 'styled-components'

const QnaNoticeContainer = styled.div`
  width: 100%;

  padding: 15px;
  margin: 10px 0;

  line-height: 24px;

  font-size: 14px;
  background: #f9f9fa;
  color: #323232;

  border: 1px solid #ebecef;
`

const QnaNotice = () => {
  return (
    <QnaNoticeContainer>
      <span style={{ fontWeight: 'bold' }}>질문 게시판 운영에 관한 공지</span>
      <br />
      <br />
      ① 질문 게시판은 강의, 교재, 평가원 기출에 한해서만 질문 받습니다.
      <br />
      → 읽기 자료, 사설 콘텐츠 등에 대해서는 답변하지 않습니다.
      <br />
      → 강의와 교재를 정확하게 적시해주셔야 정확한 답변을 받으실 수 있습니다.
      <br />
      ② 현재 진행 중인 주교재 속 지문, 문제 중 아직 수업에서 다루지 않은 지문은
      강의 후에 답변드립니다.
      <br />
      → 수강 후에도 질문이 있을 경우에 질문해 주시기 바랍니다.
      <br />
      ③ 예의를 지키지 않는 질문은 답변하지 않습니다.
      <br />
      ④ 질문의 내용은 '정확'해야 합니다.
      <br />→ 추상적인 질문, 떼쓰는 식의 질문은 답변하기가 참 어렵습니다.
      <br />→ 충분히 여러번 읽어 본 이후 질문을 해주시기 바랍니다.
      <br />
      ⑤ 한 번 게시된 질문은 삭제할 수 없습니다.
      <br />→ 신중하게 질문해 주시기 바랍니다.
      <br />
      ⑥ 추가 질문(재질문) 경우 '재질문' 버튼을 클릭해 주셔야 확인이 가능합니다.
      <br />→ 작성자는 '답변완료' 상태의 질문글에서 재질문 버튼을 클릭할 수
      있습니다.
      <br />→ 답변 확인 후에도 의문 사항이 있는 경우, 댓글로 추가 질문을 입력한
      후 해당 버튼을 클릭해 주시기 바랍니다.
      <br />→ 재질문 상태로 변경되지 않은 재질문은 확인이 불가능합니다.
    </QnaNoticeContainer>
  )
}

export default QnaNotice
