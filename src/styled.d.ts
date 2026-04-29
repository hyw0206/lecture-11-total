import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: {
        default: string; // 배경
        paper: string; // 내용 배경
      };
      text: {
        default: string; // 기본 글자
        disabled: string; // 덜 중요하거나 / 비활성화
      };
      divider: string; // 선, 테두리, 구분선
      primary: string; // 메인 브랜드 컬러
      secondary: string; // 보조 포인트 컬러
      success: string; // 성공 / 긍정적인 상황
      error: string; // 오류 / 부정적인 상황
      warning: string; // 경고 / 주의주는 상황
      info: string; // 정보 / 참고하는 상황
    };
  }
}
