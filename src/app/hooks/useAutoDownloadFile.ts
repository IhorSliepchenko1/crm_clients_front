export const useAutoDownloadFile = () => {
     const autoDownloadFile = (BASE_URL: string, fileName: string) => {
          const link = document.createElement(`a`);
          link.setAttribute(`href`, `${BASE_URL}/${fileName}`);
          link.setAttribute(`download`, `${fileName}`);
          document.body.appendChild(link);
          link.click();
          link.remove();

          return
     }

     return { autoDownloadFile }
}