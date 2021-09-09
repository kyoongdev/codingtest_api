export enum Category {
  MBTI = 1,
  CODING_TEST,
} // MBTI인지 CODING_TEST인지

export enum QuestionContentType {
  TEXT = 1,
  IMAGE_CONTENT,

} //문제나 선택지가 텍스트인지 // 이미지라면 문제인지 또는 선택지 중에 가로배치인지 세로배치인지

export enum QuestionType {
  SENSE = 1,
  GRAMMER,
  ALGORITHM,
}

export enum SelectionsType {
  IMAGE_HORIVENTAL = 1,
  IMAGE_VERTICAL,
}