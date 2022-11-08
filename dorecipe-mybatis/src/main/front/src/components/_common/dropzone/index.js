import { useCallback } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import styled from "styled-components";
import {
  EditImgPreview,
  EditImgPreviewForm,
  EditImgPreviewInner,
  FlexibleBox,
} from "./style";

export const DropZone = ({
  stepDropState,
  thumbnailDropState,
  completionDropState,

  files,
  setFiles,
  onLoadImgFile,
  setRecipeThumbnail,

  setRecipeImgFiles,
  recipe_imgs_steps,
  setRecipe_imgs_steps,

  index,
  fileState,
  setPath1,
  setPath2,
  setPath3,
  setPath4,
}) => {
  // drop handler
  const onDropHandler = useCallback(
    (files) => {
      files.forEach((file) => {
        const reader = new FileReader();
        reader.onabort = () => console.log("파일 읽기 취소");
        reader.onerror = () => console.log("파일 읽기 실패");
        reader.readAsDataURL(file);
        console.log("readAsDataURL", file);
        console.log("readAsDataURL", file.name);

        //썸네일 이미지 설정일때
        if (thumbnailDropState === "thumbnailDrop") {
          setRecipeThumbnail(file.name);
        }

        //순서 이미지 설정일때
        if (stepDropState === "stepDrop") {
          setFiles([files.index, file.name]);
          // const copy_recipe_imgs_steps = [...recipe_imgs_steps];
          // copy_recipe_imgs_steps.concat(file.name);
          // console.log("...files", ...files);
          setRecipe_imgs_steps([files.index, file.name]);
          // console.log("...files", files);
          console.log("recipe_imgs_steps", recipe_imgs_steps);
        }

        //완성 이미지 설정일때
        if (completionDropState === "completionDropState") {
          switch (files.length) {
            case 1:
              setPath1(files[0].name);
              return;
            case 2:
              setPath1(files[1].name);
              setPath2(files[0].name);
              return;
            case 3:
              setPath1(files[2].name);
              setPath2(files[1].name);
              setPath3(files[0].name);
              return;
            case 4:
              setPath1(files[3].name);
              setPath2(files[2].name);
              setPath3(files[1].name);
              setPath4(files[0].name);
              return;
            default:
              return;
          }
        }
      });
      if (completionDropState === "completionDropState") {
        if (files.length > 4) {
          alert("완성 사진은 최대 4개 업로드 가능합니다.");
          return;
        } else {
          switch (files.length) {
            case 1:
              setRecipeImgFiles([files[0]]);
              break;
            case 2:
              setRecipeImgFiles([files[0], files[1]]);
              break;
            case 3:
              setRecipeImgFiles([files[0], files[1], files[2]]);
              break;
            case 4:
              setRecipeImgFiles([files[0], files[1], files[2], files[3]]);
              break;
            default:
              return;
          }

          setFiles(
            files.map((file) =>
              Object.assign(file, {
                preview: URL.createObjectURL(file),
              })
            )
          );
        }
      }
      if (thumbnailDropState === "thumbnailDrop") {
        setRecipeImgFiles(files[0]);
        setFiles(
          files.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      }

      if (stepDropState === "stepDrop") {
        for (let i = 0; i < files.length; i++) {
          setFiles(files[i]);
        }
        setFiles(
          files.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
        console.log("fileState!~~~", fileState);
      }
    },
    [files]
  );

  // preview delete
  const onPreviewDelete = useCallback(
    (preview) => {
      const deleteFiles = files.filter((v) => v.preview !== preview);
      setFiles(deleteFiles);
      setRecipeImgFiles(deleteFiles);
      console.log("deleted", deleteFiles);
    },
    [files]
  );

  return (
    <Dropzone onDrop={onDropHandler} index={index}>
      {({ getRootProps, getInputProps }) => (
        <EditImgPreview>
          {files.length > 0 ? (
            <EditImgPreviewForm>
              {files.map((v, index) =>
                files.length < 5 ? (
                  <EditImgPreviewInner key={index}>
                    <div
                      className="fileBox"
                      onClick={() => onPreviewDelete(v.preview)}
                    >
                      <img src={v.preview} />
                      <p>파일 삭제</p>
                    </div>
                  </EditImgPreviewInner>
                ) : (
                  <>
                    <EditImgPreviewInner key={index}>
                      {v === files[files.length - 2] ? (
                        <FlexibleBox
                          fontColor="#00c7ae"
                          style={{ width: "16rem" }}
                        >
                          <span>...</span>
                        </FlexibleBox>
                      ) : (
                        v !== files[files.length - 1] && (
                          <div
                            className="fileBox"
                            onClick={() => onPreviewDelete(v.preview)}
                          >
                            <img src={v.preview} />
                            <p>파일 삭제</p>
                          </div>
                        )
                      )}
                    </EditImgPreviewInner>
                  </>
                )
              )}
            </EditImgPreviewForm>
          ) : completionDropState === "completionDropState" &&
            files.length < 4 ? (
            <>
              <div className="inputBox" {...getRootProps()}>
                <input
                  {...getInputProps()}
                  id="file"
                  type="file"
                  accept="image/*"
                  onChange={onLoadImgFile}
                />{" "}
                + <p>최대 4개의 파일을 등록하실 수 있습니다.</p>
              </div>
            </>
          ) : (
            <div className="inputBox" {...getRootProps()}>
              <input
                {...getInputProps()}
                id="file"
                type="file"
                accept="image/*"
                onChange={onLoadImgFile}
              />{" "}
              + <p>파일을 등록해주세요</p>
            </div>
          )}
        </EditImgPreview>
      )}
    </Dropzone>
  );
};
export default DropZone;
