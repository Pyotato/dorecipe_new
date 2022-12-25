import styled from "styled-components";
import { useInput } from "../../../hooks/useInput";
import { useState, useCallback, useEffect } from "react";
import EditDropZone from "../../_common/dropzone";
import axios from "axios";
import { useSelector } from "react-redux";
import { colors } from "../../../theme/theme";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import { ReactComponent as Help } from "../../../assets/Help.svg";
import { useMemo } from "react";
import { useParams } from "react-router-dom";

const BasicForm = ({
  setRecipeState,
  recipeState,
  saveState,
  setSaveState,
  btnState,
  recipeNum,
  setBtnState,
}) => {
  // const recipeId = useParams();
  const [totalInfoState, setTotalInfoState] = useState(recipeState);

  const [recipe_title, setRecipeTitle] = useState("");

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

  //썸네일 변경 버튼
  const [thumbnailChangeState, setThumbnailChangeState] = useState(0);

  //모달창
  const [explanationState, setExplanationState] = useState("none");

  //임시저장 버튼
  const [tempSaveState, setTempSaveState] = useState(0);
  const [btnDisabledState, setBtnDisabledState] = useState(false);
  const [btnDisplayState, setBtnDisplayState] = useState("block");

  // 데이터 로드
  const [loadState, setLoadState] = useState(true);

  const user = useSelector((auth) => auth);
  const [member_id, setMemberId] = useState("");

  useEffect(() => {
    setMemberId(user.auth.user.username);
    if (recipeState === undefined) {
      setLoadState(true);
    } else {
      const copyState = [...recipeState];
      setTotalInfoState(copyState);
      setLoadState(false);
    }
  }, []);
  // ----------------------------------------------------

  const onLoadImgFile = (e) => {
    onChangeRecipeThumbnail(e);
  };

  const onEditThumbnailHandler = () => {
    setThumbnailChangeState(1);
  };
  useMemo(() => {
    if (recipeState === undefined || recipeState.length === 0) {
      setLoadState(true);
    } else {
      if (totalInfoState === undefined || totalInfoState.length === 0) {
        setTotalInfoState(recipeState);
      } else {
        setLoadState(false);
      }
    }
  }, [recipeState, totalInfoState]);

  useMemo(() => {
    if (totalInfoState !== undefined && totalInfoState.length > 0) {
      setRecipeTitle(totalInfoState[0].recipe_title);
      setRecipeIntro(totalInfoState[0].recipe_introduce);
      setRecipeUrl(totalInfoState[0].recipe_url);
      setRecipeThumbnail(totalInfoState[0].recipe_rpath);
      //select은 null값 X
      setKind(totalInfoState[0].category_kind);
      setRecipeTheme(totalInfoState[0].category_theme);
      setRecipeIngre(totalInfoState[0].category_ing);
      setServingSize(totalInfoState[0].information_person);
      setLevel(totalInfoState[0].information_level);
      setTime(totalInfoState[0].information_time);
      setRecipeWay(totalInfoState[0].category_way);

      setRecipeImgFiles(totalInfoState[0].recipe_rpath);
    }
  }, [totalInfoState]);

  function onTemporarySave() {
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
      recipe_num: recipeNum,
      recipe_creDate: "",
      // recipe_num: parseInt(recipeId.recipeId),
      member_id: `${member_id}`, //로그인한 멤버 정보 들어갈 자리
    };

    // console.log("data", data);
    const blob = new Blob([JSON.stringify(data)], {
      type: "multipart/form-data",
    });

    const formData = new FormData();
    formData.append("data", blob);
    console.log("data", data);
    formData.append("recipe_title", recipe_title);
    formData.append("recipe_savetype", 1);
    formData.append("recipe_introduce", recipe_introduce);
    formData.append("recipe_url", recipe_url);

    //만약 썸네일 이미지 변경하지 않는다면
    if (totalInfoState !== undefined) {
      formData.append("recipe_rpath", data.recipe_rpath);
    } else {
      formData.append("recipe_thumbnail", recipe_thumbnail);
      formData.append("recipe_rpath", data.recipe_rpath);
    }

    formData.append("category_kind", data.category_kind);
    formData.append("category_theme", data.category_theme);
    formData.append("category_way", data.category_way);
    formData.append("category_ing", data.category_ing);
    formData.append("information_person", data.information_person);
    formData.append("information_level", data.information_level);
    formData.append("information_time", data.information_time);
    // formData.append("recipe_creDate");
    formData.append("member_id", user.auth.user.username);
    formData.append("recipe_num", recipeNum);

    axios({
      method: "POST",
      // url: process.env.REACT_APP_HOST + "/recipe/update",
      url: "http://localhost:9000/recipe/update",
      headers: {
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => {
        // for (let value of formData.values()) {
        //   console.log("formData", value);
        // }
        // // console.log("data", formData);
        console.log("response", response);

        setBtnState(1);
        setBtnDisplayState("none");
      })
      .catch((e) => console.log(e));
  }

  // useCallback(() => {
  //   if (recipe_title !== "") {
  //     onTemporarySave();
  //   }
  // }, [
  //   recipe_title,
  //   recipe_introduce,
  //   recipe_url,
  //   recipe_rpath,
  //   category_kind,
  //   category_theme,
  //   category_way,
  //   category_ing,
  //   information_person,
  //   information_time,
  //   information_level,
  //   recipe_thumbnail,
  // ]);

  //페이지를 벗어난다면 저장해주기
  if (recipeNum !== undefined) {
    window.addEventListener("beforeunload", onTemporarySave());
  }

  //언마운트 시 임시저장
  // useEffect(() => {
  //   return () => {
  //     onTemporarySave();
  //   };
  // }, [
  //   recipe_title,
  //   recipe_introduce,
  //   recipe_url,
  //   recipe_rpath,
  //   category_kind,
  //   category_theme,
  //   category_way,
  //   category_ing,
  //   information_person,
  //   information_time,
  //   information_level,
  //   recipe_thumbnail,
  //   recipeNum,
  // ]);
  return (
    <>
      <div style={{ height: "fit-content" }}>
        <BasicFormWrap
          style={{
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
                  disabled
                  style={{ width: "85%" }}
                  value={recipe_title}
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
                    onMouseEnter={() => {
                      setExplanationState("block");
                    }}
                    onClick={() => {
                      explanationState === "block"
                        ? setExplanationState("none")
                        : setExplanationState("block");
                    }}
                    style={{
                      width: "1vw",
                      display: "inline-block",
                    }}
                  />
                </Labels>
                <div
                  style={{
                    position: "fixed",
                    zIndex: 500,
                    display: explanationState,
                    backgroundColor: "black",
                    width: "100%",
                    left: 0,
                    bottom: 0,
                    top: 0,
                    height: "100%",
                    opacity: "0.6",
                  }}
                ></div>
                <div
                  style={{
                    position: "fixed",
                    zIndex: 600,
                    left: "50%",
                    top: "50%",
                    transform: "translate(-50%,-50%)",
                    opacity: "1",
                    display: explanationState,
                    backgroundColor: "#FFFFFF",
                    padding: "1vw",
                  }}
                >
                  <div style={{ paddingBottom: "1vw", fontWeight: "700" }}>
                    ※ 유튜브 또는 네이버 영상만 지원합니다.
                  </div>
                  <div style={{ paddingBottom: "1vw" }}>
                    <div style={{ paddingBottom: "1vw" }}>
                      1. 공유하고자하는 영상의 "share" 또는 "공유하기" 버튼을
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
                      2. "embed"를 클릭해주세요.
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
                  <div
                    onClick={() => {
                      setExplanationState("none");
                    }}
                    style={{ textAlign: "center", fontWeight: 600 }}
                  >
                    [ 닫기 ]
                  </div>
                </div>
                <ContentTextarea
                  rows="2"
                  cols="50"
                  style={{ width: "85%" }}
                  value={recipe_url}
                  onChange={onChangeRecipeUrl}
                  name="recipeVid"
                  placeholder="레시피 URL 주소를 입력해주세요. (예: https://www.youtube.com/embed/내 영상)."
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
                    <option value="">종류별</option>
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
              style={{
                overflow: "hidden",
                padding: "2vh 1vw",
              }}
            >
              {recipe_thumbnail && thumbnailChangeState === 0 ? (
                <>
                  <div style={{ margin: "0 auto", width: "80%" }}>
                    <img
                      className="originalImg"
                      src={recipe_thumbnail}
                      alt={recipe_thumbnail}
                      onClick={onEditThumbnailHandler}
                    />
                  </div>
                  <div
                    style={{
                      transform: "translateY(-12em)",
                      color: "red",
                      textAlign: "center",
                    }}
                  >
                    파일 변경
                  </div>
                </>
              ) : (
                <EditDropZone
                  files={files}
                  recipe_thumbnail={recipe_thumbnail}
                  setFiles={setFiles}
                  onChange={onLoadImgFile}
                  setRecipeThumbnail={setRecipeThumbnail}
                  setRecipeImgFiles={setRecipeImgFiles}
                  thumbnailDropState={thumbnailDropState}
                />
              )}
            </div>
          </div>
        </BasicFormWrap>
      </div>
      <TempSaveBtn
        type="button"
        onClick={onTemporarySave}
        disabled={btnDisabledState}
        style={{ display: "none" }}
        // style={{ display: btnDisplayState }}
      >
        <FontAwesomeIcon icon={faFloppyDisk} />
        <div>임시저장</div>
      </TempSaveBtn>
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
  justify-content: center;

  & .recipeLeftWrap {
    width: 50%;
    height: 100%;
    /* background-color: red; */
  }
  & .recipeRightWrap {
    /* height: 100%; */
    height: 50vh;
    justify-content: center;
    width: 45%;
    align-items: center;

    background-color: ${colors.color_white};
    border-radius: 1vw;
    /* background-color: yellow; */
  }

  & .originalImg:hover {
    cursor: pointer;
    opacity: 0.2;
  }
  & .originalImg {
    max-width: 27vw;
    /* min-width: 25em; */
    max-height: 48vh;
    padding: 1vw;
    /* height: 21em; */
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

const TempSaveBtn = styled.button`
  width: 5em;
  height: 5em;
  border-radius: 100%;
  padding: 0.5em;
  position: fixed;
  right: 1.5vw;
  bottom: 3vh;
  /* background-color: ${colors.color_beige_brown}; */
  background-color: green;
  border: 1px solid transparent;

  &:hover {
    cursor: pointer;
    transform: scaleX(1.2) scaleY(1.2);
    background-color: ${colors.color_carrot_orange};
    color: ${colors.color_beige_tinted_white};
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
