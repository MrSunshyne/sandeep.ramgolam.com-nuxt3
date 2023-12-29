import type { Nullable } from "@tryghost/content-api";
import jsdom from "jsdom";
import { unGhostUrl } from "./image-client-utils";

export const OG_IMAGE_DEFAULT = "https://picsum.photos/1920/1080";

export const htmlImageSwapping = async (html: string) => {
  const { JSDOM } = jsdom;
  const dom = new JSDOM(html);
  const imgTags: HTMLCollectionOf<HTMLImageElement> =
    dom.window.document.getElementsByTagName("img");

  const imgUrls = Array.from(imgTags).map((img) => img.src);
  const srcSet = Array.from(imgTags)
    .map((img) => img.srcset)
    .filter((srcset) => srcset !== "");
  const srcSetUrls = extractUrlFromImgSrcset(srcSet).join().split(",");
  let allUrls = [...imgUrls, ...srcSetUrls];
  let allUrlsMap = allUrls.map((url) => [url, ""]);
  const cache = await replaceImagePaths(allUrlsMap);
  const output = htmlReplace(html, cache);
  return output;
};

// Safely returns the image url or the default image
export const getImageThumbnail = (image: Nullable<string> | undefined) => {
  return image ? image : OG_IMAGE_DEFAULT;
};

export const extractUrlFromImgSrcset = (srcsetstring: string[]) => {
  return srcsetstring.map((srcsetInstance) => {
    const srcset = srcsetInstance.split(",");
    const srcsetUrls = srcset.map((src) => {
      const url = src.trim().split(" ")[0];
      return url;
    });
    return srcsetUrls;
  });
};

export const replaceImagePaths = (images: string[][]): string[][] => {
  const showImageLog = false;
  let output = images.map((image) => {
    if (image[0] === "") {
      showImageLog && console.log("skipping");
      return image;
    }
    let inputImage = image[0];
    let outputImage = unGhostUrl(inputImage);

    return [inputImage, outputImage as string];
  });

  showImageLog && console.log(`replaced ${images.length} images`);
  return output;
};


export const htmlReplace = (html: string, images: string[][]) => {
  let output = html;
  images.forEach((image) => {
    output = output.replace(image[0], image[1]);
  });
  return output;
};
