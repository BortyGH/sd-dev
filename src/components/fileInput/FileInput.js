import { Icon } from "../icon";
import { Row } from "antd";
import { Spacing } from "../spacing";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase-utils";
import styled from "styled-components";

export const FileInput = ({ removeFile, files, setFiles, canEdit }) => {
  const onFileUpload = async (selectedFiles) => {
    const fileArray = Array.from(selectedFiles);
    const uploadedFiles = await Promise.all(
      fileArray.map(async (file) => {
        const fileRef = ref(storage, `files/${file.name}`);
        return await uploadBytes(fileRef, file).then(async (snapshot) => ({
          name: snapshot.metadata.name,
          link: await getDownloadURL(snapshot.ref).then((url) => url),
        }));
      })
    );
    setFiles(uploadedFiles);
  };

  return (
    <>
      <label>
        <Icon name={Icon.ICONS.UPLOADING} />

        <input
          type="file"
          onChange={(event) => onFileUpload(event.target.files)}
          accept=".jpeg, .png, .jpg, .pdf, .txt"
          multiple
          style={{ display: "none" }}
        />
      </label>

      <FileContainer>
        {files.map((value, index) => {
          return (
            <div key={index}>
              <Row style={{ marginBottom: 10 }}>
                <div
                  onClick={() => {
                    const win = window.open(value.link, "_blank");
                    win.focus();
                  }}
                >
                  <InputContainer>
                    <Icon name={Icon.ICONS.FILE} size={Icon.SIZES.SMALL} />
                    <InputTextContainer>{value.name}</InputTextContainer>
                  </InputContainer>
                </div>

                <Spacing
                  size={Spacing.SIZES.SIZE_8}
                  type={Spacing.TYPES.HORIZONTAL}
                />
                {canEdit && (
                  <Icon
                    name={Icon.ICONS.DELETE}
                    size={Icon.SIZES.SMALL}
                    type="button"
                    onClick={() => removeFile(value.link)}
                  />
                )}
              </Row>
              <Spacing
                size={Spacing.SIZES.SIZE_16}
                type={Spacing.TYPES.VERTICAL}
              />
            </div>
          );
        })}
      </FileContainer>
    </>
  );
};

const FileContainer = styled.div`
   {
    margin: 0px;
    margin-top: 20px;
    padding: 0px;
    cursor: pointer;
  }
`;

const InputContainer = styled.span`
   {
    padding: 8px 14px 8px 14px;
    width: 124px;
    height: 30px;
    background: #eff5ff;
    border-radius: 4px;
  }
`;

const InputTextContainer = styled.span`
   {
    font-weight: 400;
    font-size: 12px;
    color: #0045ff;
    margin-left: 6px;
  }
`;
