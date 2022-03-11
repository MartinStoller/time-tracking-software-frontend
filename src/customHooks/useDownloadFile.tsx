import { AxiosResponse } from "axios";
import { useRef, useState } from "react";

//Source: https://www.techprescient.com/react-custom-hook-typescript-to-download-a-file-through-api/

interface DownloadFileProps {
  readonly apiDefinition: () => Promise<AxiosResponse<Blob>>; // An axios API called wrapped inside a function which contains API definition.
  readonly preDownloading: () => void; // Function which is executed just before calling the API. This function can be used as a pre hook to do any tasks which needs to be done before the API call is made. For example disableButton()
  readonly postDownloading: () => void; //Function which is executed after making the API call. For example enableButton()
  readonly onError: () => void; // Function to be called when API has resulted in failure.
  readonly getFileName: () => string;
}

interface DownloadedFileInfo { //Utilities exposed by the hook:
  readonly download: () => Promise<void>; // function which needs to be invoked when file needs to be downloaded. For more info check the comment below this codeblock
  readonly ref: React.MutableRefObject<HTMLAnchorElement | null>; // ref which will be attached to the <a /> tag in the parent component.
  readonly name: string | undefined; // name of the file which the user sees when downloading it on their system.
  readonly url: string | undefined; // URL representing the data fetched from the API.
}

/* Flow of download function:
1.) Invoke preDownloading function.
2.) Call the API. In case of any error, onError function will be invoked to handle the error.
3.) Create a url which represents the downloaded data and store it in the state. This url is provided to <a href... />.
4.) Generate the name of the file by which it will be downloaded in the browser. Store the same name in the state.
5.) Click the <a /> in the DOM to download the file.
6.) Invoke postDownloading function.
7.) Destroy the generated url. */

export const useDownloadFile = ({ // define custom Hook with its props
  apiDefinition,
  preDownloading,
  postDownloading,
  onError,
  getFileName,
}: DownloadFileProps): DownloadedFileInfo => {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const [url, setFileUrl] = useState<string>();
  const [name, setFileName] = useState<string>();

  const download = async () => {
    try {
      preDownloading();
      const { data } = await apiDefinition();
      const url = URL.createObjectURL(new Blob([data]));
      setFileUrl(url);
      setFileName(getFileName());
      ref.current?.click();
      postDownloading();
      URL.revokeObjectURL(url);
    } catch (error) {
      onError();
    }
  };

  return { download, ref, url, name };
};

//Check implementation of this hook in billingExport.tsx