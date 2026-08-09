declare module "html-docx-js/dist/html-docx" {
  const htmlDocx: {
    asBlob: (html: string) => Promise<Blob>;
  };
  export default htmlDocx;
}
