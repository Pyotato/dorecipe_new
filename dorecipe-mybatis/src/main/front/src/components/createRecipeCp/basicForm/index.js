import {} from "@fortawesome/free-solid-svg-icons";
import { DefaultBtn } from "../../_common/buttons";
// import "./style.css";
import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import { useState, useCallback, useEffect } from "react";
import EditDropZone from "../../_common/dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { colors } from "../../../theme/theme";
import { ReactComponent as Help } from "../../../assets/Help.svg";

const BasicForm = ({
  recipeState,
  setRecipeState,
  saveState,
  setSaveState,
}) => {
  const [recipe_title, onChangeRecipeTitle, setRecipeTitle] = useInput("");
  const [recipe_introduce, onChangeRecipeIntro, setRecipeIntro] = useInput("");
  const [recipe_url, onChangeRecipeUrl, setRecipeUrl] = useInput("");
  const [recipe_rpath, onChangeRecipeThumbnail, setRecipeThumbnail] =
    useInput("");
  const [category_kind, onChangeKind, setKind] = useInput("");
  const [category_theme, onChangeTheme, setRecipeTheme] = useInput("");
  const [category_way, onChangeWay, setRecipeWay] = useInput("");
  const [category_ing, onChangeIngr, setRecipeIngre] = useInput("");
  const [information_person, onChangeServingSize, setServingSize] =
    useInput("");
  const [information_time, onChangeTime, setTime] = useInput("");
  const [information_level, onChangeLevel, setLevel] = useInput("");

  const [files, setFiles] = useState("");
  const [recipe_thumbnail, setRecipeImgFiles] = useState("");
  const [thumbnailDropState, setThumbnailDropState] = useState("thumbnailDrop");

  const [explanationState, setExplanationState] = useState("none");
  // member_id 가져오기

  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState("");
  useEffect(() => {
    // if (user.auth.isLoggedIn) {
    setMemberId(user.auth.user.username);
    setSaveState(0);

    console.log(user.auth.user.username);
    // console.log("setRecipeState: " + member_id);
    // }
  }, []);
  // ----------------------------------------------------

  const onLoadImgFile = (e) => {
    onChangeRecipeThumbnail(e);
  };

  const onTemporarySave = useCallback(
    (e) => {
      e.preventDefault();
      if (recipe_url.length > 0) {
        if (recipe_url.includes("/embed/")) {
          if (recipe_url.includes("youtube")) {
            //유튜브영상일 경우
            setRecipeUrl(
              recipe_url.slice(
                recipe_url.indexOf("https"),
                recipe_url.indexOf('" title')
              )
            );
          } else if (recipe_url.includes("naver")) {
            //네이버 영상일 경우
            setRecipeUrl(
              recipe_url.slice(
                recipe_url.indexOf("https"),
                recipe_url.indexOf(" 'frameborder")
              )
            );
          }
        } else {
          setRecipeUrl("");
          alert("영상 형식이 잘못되었습니다.");
        }
      }
      const data = {
        recipe_title: `${recipe_title}`,
        recipe_savetype: 1, //임시저장
        recipe_introduce: `${recipe_introduce}`,
        recipe_url: `${recipe_url}`,
        recipe_rpath: `${recipe_rpath}`,
        category_kind: `${category_kind}`,
        category_theme: `${category_theme}`,
        category_way: `${category_way}`,
        category_ing: `${category_ing}`,
        information_person: `${information_person}`,
        information_time: `${information_time}`,
        information_level: `${information_level}`,
        recipe_creDate: "",
        member_id: `${member_id}`, //로그인한 멤버 정보 들어갈 자리
      };

      console.log("data", data);
      const blob = new Blob([JSON.stringify(data)], {
        type: "multipart/form-data",
      });

      const formData = new FormData();
      formData.append("data", blob);
      formData.append("recipe_title", data.recipe_title);
      formData.append("recipe_savetype", data.recipe_savetype);
      formData.append("recipe_introduce", data.recipe_introduce);
      formData.append("recipe_url", data.recipe_url);
      formData.append("recipe_rpath", data.recipe_rpath);
      formData.append("recipe_thumbnail", recipe_thumbnail);
      //기본값을 전체로 들어가게끔
      data.category_kind !== ""
        ? formData.append("category_kind", data.category_kind)
        : formData.append("category_kind", "전체");
      data.category_theme !== ""
        ? formData.append("category_theme", data.category_theme)
        : formData.append("category_theme", "전체");
      data.category_way !== ""
        ? formData.append("category_way", data.category_way)
        : formData.append("category_way", "전체");
      data.category_ing !== ""
        ? formData.append("category_ing", data.category_ing)
        : formData.append("category_ing", "전체");
      formData.append("information_person", data.information_person);
      formData.append("information_level", data.information_level);
      formData.append("information_time", data.information_time);
      formData.append("recipe_creDate", data.recipe_creDate);
      formData.append("member_id", user.auth.user.username);

      axios({
        method: "POST",
        // url: process.env.REACT_APP_HOST + "/recipe/save",
        url: "http://localhost:9000/recipe/save",
        headers: {
          "Content-Type": "multipart/form-data",
        },
        data: formData,
      })
        .then(() => {
          setSaveState(1);
        })
        .then((response) => {
          for (let value of formData.values()) {
            console.log(value);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    [
      recipe_title,
      recipe_introduce,
      recipe_url,
      recipe_rpath,
      category_kind,
      category_theme,
      category_way,
      category_ing,
      information_person,
      information_time,
      information_level,
      files,
    ]
  );

  return (
    <>
      <div style={{ height: "fit-content" }}>
        <BasicFormWrap
          style={{
            backgroundColor: "green",
            clear: "both",
            display: "block",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "inline-flex",
              width: "100%",
              gap: "2vw",
              alignItems: "center",
            }}
          >
            <div className="recipeLeftWrap">
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                  paddingBottom: "2vh",
                  alignItems: "center",
                }}
              >
                <Labels htmlFor="recipeTitle" style={{ width: "15%" }}>
                  레시피 제목
                </Labels>
                <ContentInput
                  type="text"
                  name="recipe_title"
                  required
                  style={{ width: "85%" }}
                  value={recipe_title}
                  onChange={onChangeRecipeTitle}
                  placeholder="나만의 레시피가 돋보이는 이름을 지어주세요 (필수)"
                />
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                  paddingBottom: "2vh",
                  alignItems: "center",
                }}
              >
                <Labels htmlFor="recipeIntro" style={{ width: "15%" }}>
                  요리 소개
                </Labels>
                <ContentTextarea
                  rows="2"
                  cols="50"
                  style={{ width: "85%" }}
                  value={recipe_introduce}
                  onChange={onChangeRecipeIntro}
                  name="recipeIntro"
                  placeholder="레시피에 대한 소개를 해주세요."
                ></ContentTextarea>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                  paddingBottom: "2vh",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <Labels htmlFor="recipeVid" style={{ width: "15%" }}>
                  동영상
                  <Help
                    onMouseOver={() => {
                      setExplanationState("block");
                    }}
                    onMouseLeave={() => {
                      setExplanationState("none");
                    }}
                    style={{
                      width: "1vw",
                      display: "inline-block",
                    }}
                  />
                </Labels>
                <div
                  style={{
                    position: "absolute",
                    zIndex: 700,
                    left: "15vw",
                    display: explanationState,
                    backgroundColor: "pink",
                    padding: "1vw",
                  }}
                >
                  <div style={{ paddingBottom: "1vw" }}>
                    <div style={{ paddingBottom: "1vw" }}>
                      1.공유하고자하는 영상의 "share" 또는 "공유하기" 버튼을
                      클릭해주세요.
                    </div>
                    <img
                      style={{ width: "20vw" }}
                      src="/img/share.jpg"
                      alt="explanation 1"
                    />
                  </div>
                  <div style={{ paddingBottom: "1vw" }}>
                    <div style={{ paddingBottom: "1vw" }}>
                      2. "embedded"을 클릭해주세요.
                    </div>
                    <img
                      style={{ width: "20vw" }}
                      src="/img/share2.jpg"
                      alt="explanation 2"
                    />
                  </div>
                  <div style={{ paddingBottom: "1vw" }}>
                    <div style={{ paddingBottom: "1vw" }}>
                      3. 아래의 빨간 박스의 영역을 복사하여 붙여주세요.
                    </div>
                    <img
                      src="/img/share3.jpg"
                      alt="explanation 3"
                      style={{ width: "20vw" }}
                    />
                  </div>
                </div>
                <ContentTextarea
                  rows="2"
                  cols="50"
                  style={{ width: "85%" }}
                  value={recipe_url}
                  onChange={onChangeRecipeUrl}
                  name="recipeVid"
                  placeholder="레시피에 등록할 동영상이 있으면 URL 주소를 입력해주세요. (예: https://www.youtube.com/embed/내 영상). embedded 영상이 아닐 시 등록되지 않을 수 있습니다."
                ></ContentTextarea>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                  paddingBottom: "2vh",
                  alignItems: "center",
                  height: "8vh",
                  flexWrap: "wrap",
                  // justifyContent: "space-between",
                }}
              >
                <Labels htmlFor="category_kind" style={{ width: "15%" }}>
                  카테고리
                </Labels>
                <div
                  style={{
                    width: "85%",
                    display: "inline-flex",
                    justifyContent: "space-between",
                  }}
                >
                  <select
                    name="category_kind"
                    value={category_kind}
                    onChange={onChangeKind}
                    style={{ width: "22%", margin: "0" }}
                  >
                    <option>종류별</option>
                    <option value="전체">전체</option>
                    <option value="밑반찬">밑반찬</option>
                    <option value="메인반찬">메인반찬</option>
                    <option value="국/탕">국•탕</option>
                    <option value="찌개">찌개</option>
                    <option value="디저트">디저트</option>
                    <option value="면/만두">면•만두</option>
                    <option value="밥/죽/떡">밥•죽•떡</option>
                    <option value="퓨전">퓨전</option>
                    <option value="김치/젓갈">김치/젓갈</option>
                    <option value="양념/소스/잼">양념•소스•잼</option>
                    <option value="양식">양식</option>
                    <option value="샐러드">샐러드</option>
                    <option value="스프">스프</option>
                    <option value="빵">빵</option>
                    <option value="과자">과자</option>
                    <option value="차/음료/술">차•음료•술</option>
                    <option value="기타">기타</option>
                  </select>
                  <label style={{ display: "none" }}>상황•테마별</label>
                  <select
                    name="category_theme"
                    value={category_theme}
                    onChange={onChangeTheme}
                    // style={{ width: "8vw" }}
                    style={{ width: "25%", margin: "0" }}
                  >
                    <option>상황•테마별</option>
                    <option value="전체">전체</option>
                    <option value="일상">일상</option>
                    <option value="초스피드">초스피드</option>
                    <option value="손님접대">손님접대</option>
                    <option value="술안주">술안주</option>
                    <option value="다이어트">다이어트</option>
                    <option value="도시락">도시락</option>
                    <option value="영양식">영양식</option>
                    <option value="간식">간식</option>
                    <option value="야식">야식</option>
                    <option value="해장">해장</option>
                    <option value="명절">명절</option>
                    <option value="이유식">이유식</option>
                    <option value="기타">기타</option>
                    <option value="연예인/유명인">연예인•유명인</option>
                  </select>
                  <label style={{ display: "none" }}>재료별</label>
                  <select
                    name="category_ingredient"
                    value={category_ing}
                    // style={{ width: "6.5vw" }}
                    style={{ width: "25%", margin: "0" }}
                    onChange={onChangeIngr}
                  >
                    <option>재료별</option>
                    <option value="전체">전체</option>
                    <option value="소고기">소고기</option>
                    <option value="돼지고기">돼지고기</option>
                    <option value="닭고기">닭고기</option>
                    <option value="육류">육류</option>
                    <option value="채소류">채소류</option>
                    <option value="해물류">해물류</option>
                    <option value="달걀•유제품">달걀•유제품</option>
                    <option value="가공식품">가공식품</option>
                    <option value="쌀">쌀</option>
                    <option value="해장">해장</option>
                    <option value="밀가루">밀가루</option>
                    <option value="건어물류">건어물류</option>
                    <option value="기타">버섯류</option>
                    <option value="과일류">과일류</option>
                    <option value="콩/견과물">콩•견과물</option>
                    <option value="기타">기타</option>
                  </select>
                  <label style={{ display: "none" }}>방법별</label>
                  <select
                    name="category_way"
                    value={category_way}
                    style={{ width: "25%", margin: "0" }}
                    onChange={onChangeWay}
                  >
                    <option>방법별</option>
                    <option value="전체">전체</option>
                    <option value="볶음">볶음</option>
                    <option value="끓이기">끓이기</option>
                    <option value="부침">부침</option>
                    <option value="조림">조림</option>
                    <option value="무침">무침</option>
                    <option value="비빔">비빔</option>
                    <option value="찜">찜</option>
                    <option value="튀김">튀김</option>
                    <option value="삶기">삶기</option>
                    <option value="굽기">굽기</option>
                    <option value="데치기">데치기</option>
                    <option value="회">회</option>
                    <option value="기타">기타</option>
                  </select>
                </div>
              </div>
              <div
                style={{
                  display: "inline-flex",
                  width: "100%",
                  paddingBottom: "2vh",
                  alignItems: "center",
                  flexWrap: "wrap",
                }}
              >
                <div style={{ width: "15%" }}>
                  <Labels>요리 정보</Labels>
                </div>
                <div
                  style={{
                    width: "85%",
                    display: "inline-flex",
                    justifyContent: "space-between",
                  }}
                >
                  <label style={{ display: "none" }}>인원</label>
                  <select
                    name="info_servings"
                    value={information_person}
                    onChange={onChangeServingSize}
                    style={{ margin: "0", width: "30%" }}
                  >
                    <option>인분</option>
                    <option value="1인분">1인분</option>
                    <option value="2인분">2인분</option>
                    <option value="3인분">3인분</option>
                    <option value="4인분">4인분</option>
                    <option value="5인분 이상">5인분 이상</option>
                  </select>
                  <label style={{ display: "none" }}>시간</label>
                  <select
                    name="info_time"
                    style={{ margin: "0", width: "30%" }}
                    value={information_time}
                    onChange={onChangeTime}
                  >
                    <option>시간</option>
                    <option value="5분 이내">5분 이내</option>
                    <option value="15분 이내">15분 이내</option>
                    <option value="20분 이내">20분 이내</option>
                    <option value="30분 이내">30분 이내</option>
                    <option value="1시간 이내">1시간 이내</option>
                    <option value="90분 이내">90분 이내</option>
                    <option value="2시간 이내">2시간 이내</option>
                    <option value="2시간 이상">2시간 이상</option>
                  </select>
                  <label style={{ display: "none" }}>난이도</label>
                  <select
                    name="info_level"
                    value={information_level}
                    onChange={onChangeLevel}
                    style={{ margin: "0", width: "30%" }}
                  >
                    <option>난이도</option>
                    <option value="아무나">아무나</option>
                    <option value="초급">초급</option>
                    <option value="중급">중급</option>
                    <option value="요리왕급">요리왕급</option>
                  </select>
                </div>
              </div>
            </div>
            <div
              className="recipeRightWrap"
              style={{ overflow: "hidden", padding: "1vw" }}
            >
              <EditDropZone
                files={files}
                setFiles={setFiles}
                onChange={onLoadImgFile}
                setRecipeThumbnail={setRecipeThumbnail}
                setRecipeImgFiles={setRecipeImgFiles}
                thumbnailDropState={thumbnailDropState}
              />
            </div>
          </div>
        </BasicFormWrap>
        <DefaultBtn type="button" onClick={onTemporarySave}>
          <FontAwesomeIcon icon={faFloppyDisk} /> 임시 저장하기
        </DefaultBtn>
      </div>
    </>
  );
};
export default BasicForm;

const BasicFormWrap = styled.div`
  display: inline-flex;

  align-items: center;
  justify-content: space-evenly;
  align-items: center;

  font-size: 1vw;
  height: fit-content;
  align-items: center;
  flex-wrap: wrap;
  font-family: "mainFont";
  gap: 3em;
  width: 80vw;
  /* padding: 1vw;/ */

  & .recipeLeftWrap {
    width: 50%;
    height: 100%;
    background-color: red;
  }
  & .recipeRightWrap {
    height: 100%;
    width: 50%;
    align-items: center;
    background-color: yellow;
  }

  & select {
    border: 1px solid transparent;
    font-family: "mainFont";
    width: 5.7vw;
    border-radius: 0.5vw;
    padding: 0.3vw 0;
    margin: 0;
    font-size: 1vw;
  }
`;
const ContentInput = styled.input`
  width: 30vw;
  height: 3vh;
  padding: 15px;
  border: 1px solid transparent;
  border-radius: 0.5em;
  font-family: "mainFont";
  font-size: 1vw;
`;
const ContentTextarea = styled.textarea`
  resize: none;
  width: 30vw;
  font-family: "mainFont";
  height: 12vh;
  border: 1px solid transparent;
  margin-bottom: 1em;
  padding: 10px;
  font-size: 1vw;
  line-height: 2;
  border-radius: 0.5em;
  ::-webkit-scrollbar {
    display: none;
  }
`;
const Labels = styled.label`
  display: inline-block;
  width: 7em;
`;
