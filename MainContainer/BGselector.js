import React from "react";
import { Image, Dimensions } from "react-native";
const DevDim = Dimensions.get("screen");

const imageSelector = () => {
  const imageSources = [
    require("../MainContainer/Backgrounds/1.png"),
    require("../MainContainer/Backgrounds/2.png"),
    require("../MainContainer/Backgrounds/3.png"),
    require("../MainContainer/Backgrounds/4.jpg"),
    // require("../MainContainer/Backgrounds/5.png"),
    require("../MainContainer/Backgrounds/6.jpg"),
    require("../MainContainer/Backgrounds/7.png"),
    // require("../MainContainer/Backgrounds/9.png"),
    require("../MainContainer/Backgrounds/10.png"),
    require("../MainContainer/Backgrounds/11.jpg"),
    // require("../MainContainer/Backgrounds/12.png"),
    require("../MainContainer/Backgrounds/13.png"),
    require("../MainContainer/Backgrounds/14.jpg"),
    require("../MainContainer/Backgrounds/15.jpg"),
  ];

  const randomIndex = Math.floor(Math.random() * imageSources.length);
  const randomImageSource = imageSources[randomIndex];

  return (
    <Image
      source={randomImageSource}
      style={{
        height: DevDim.height,
        width: DevDim.width,
        resizeMode: "cover",
      }}
    />
  );
};

export default imageSelector;
