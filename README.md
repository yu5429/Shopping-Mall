# Stationery 문방구 프로젝트
1.개발환경  
  Eclipse, Java, Spring-boot, jQuery, Mybatis, Oracle SQL

2.개발기간  
2023-03-27 ~ 2023-04-12 (3주)

2.개발인원  
  4인
  
  **-담당 파트-**  
  **공지 게시판 전체 CRUD 기능과 문의 게시판의 상품 정보 연동을 통한 상품 문의 기능 및 관리자 답변 기능 일부 로직,   
  상품페이지의 상품정보와 별점리뷰, 후기 작성을 담당하였습니다.** 

3.프로젝트 목적 및 설명   
  기본적인 개발 역량 증가를 위해 가장 대중적인 쇼핑몰+게시판 기능을 넣은 프로젝트를 선택하였습니다.<br>
  기본적인 회원가입CRUD로 로그인 기능을 구현하였고 회원들이 상품을 구매하고 해당 상품에 대한 문의나 구매 후기를 작성할 수 있게 하였으며,<br>
  관리자는 상품을 관리할 수 있는 CRUD 기능을 구현하였습니다. 또한 동적인 웹페이지를 만들고자 Ajax를 이용하여 각 페이지에서도 데이터가 독립적으로 호출되어
  표시되도록 하였습니다.<br><br><br>

4.주요 기능<br>
 사용자가 상품을 장바구니에 담고 구매, 상품에 대한 문의, 상품에 대한 리뷰를 할 수 있으며
 관리자는 공지사항 작성, 고객 문의 답변, 배송 관리, 상품 등록 관리가 가능합니다.

***

사이트 구조도  
![image](https://github.com/yu5429/Shopping-Mall/assets/123722364/93081ce9-0566-4244-aceb-0812a431a0b8)


***

DB 테이블 설계  
![image](https://github.com/yu5429/Shopping-Mall/assets/123722364/f8363c4a-59b1-449c-b8b1-66702d8aa07d)

***
<br><br><br>
**실제 구현 이미지**<br><br><br>
***
**메인 페이지**<br>
![KakaoTalk_20230622_093950153](https://github.com/yu5429/Shopping-Mall/assets/123722364/ceb83ba5-1cca-47f6-9a3e-02ab7fa715eb)

***
**메인 페이지2**<br>
![KakaoTalk_20230622_093950153_01](https://github.com/yu5429/Shopping-Mall/assets/123722364/da97b118-9bf0-492d-9c00-ea672e7f42e8)

***


**로그인 화면**  
![화면 캡처 2023-05-15 105001](https://github.com/yu5429/Shopping-Mall/assets/123722364/753dc91d-7474-452c-9655-e5ac43b8c19e)
  
**공지 게시판**
![image](https://github.com/yu5429/Shopping-Mall/assets/123722364/7693f4ad-c7c6-4d48-9a7b-61a82ce61bc8)
  
***
**문의 게시판**  
![image](https://github.com/yu5429/Shopping-Mall/assets/123722364/f9ab858a-3066-4896-8d82-9bbfd2538188)
  
***
**상품 페이지 별점/리뷰**  
![화면 캡처 2023-05-15 105258](https://github.com/yu5429/Shopping-Mall/assets/123722364/e836dfd2-5610-4865-8e1d-b0867c85f328)
<br>
***
**상품 페이지(상품 이미지 미지정/기본 상태)**
![화면 캡처 2023-05-15 105232](https://github.com/yu5429/Shopping-Mall/assets/123722364/b07f1c59-d289-4678-9621-dea0cf4b75bd)
<br>
***

**개발간의 아쉬운점/문제점**<br>
개발인원 모두 첫 프로젝트이며 기본적인 프로젝트 경험이 없는 인원들이 모여서 진행하다보니 기초적인 설계를 신경쓰지않고 <br> 
바로 코드 작성을 시작하고 도중에 필요 기능을 구현하는 방식의 주먹구구식으로 진행되면서 프로젝트가 절반이상 진행된 이후  <br>
다양한 오류 발생과 DB 테이블 수정등이 매우 자주 일어났고 이로 인해 실제 구현이 예상과는 다른 경우도 있었습니다.<br>
초기 프로젝트 시작 단계에서 좀 더 철저하게 설계를 하면서 진행을 했으면 하는 아쉬움이 매우 컸습니다. <br><br>

**향후 개선 사항**  
리뷰 작성시 사용자의 후기를 보여줄 이미지 넣기와 상품 정보를 관리자와 실시간으로 문의할 수 있는 문의 채팅등의 기능을 추가하고
일부 부족한 ui를 보완하여 각 페이지별 직관성을 높이고 쉽게 이용할 수 있도록 사용자 친화적으로 구현할 예정입니다.


