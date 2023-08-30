interface IceCreamImageProps {
  flavour: string;
}

function IceCreamImage({ flavour }: IceCreamImageProps) {
  let img_url =
    "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse4.mm.bing.net%2Fth%3Fid%3DOIP.7d_HzCSlwXwc5b-R3OPdIQHaFc%26pid%3DApi&f=1&ipt=421aa64877662b16a95f2655055d62d487403a4409ce326f22e8c0cb1c2d489c&ipo=images";

  if (flavour === "Chocolate") {
    img_url =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.pnp2ZAIMYQ94Gw3CJ0_u9wHaLH%26pid%3DApi&f=1&ipt=73b9feda2a6acace810bcb65e407d8d1039d883be7326afdeb979350ddead87c&ipo=images";
  } else if (flavour === "Strawberry") {
    img_url =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse3.mm.bing.net%2Fth%3Fid%3DOIP.McD_xGNzr8hCsSQD9eo6iQHaLH%26pid%3DApi&f=1&ipt=d69a1a00e37ab3fdb9e498c83038aff8b32a3832e7209a947d919abc8c41cf6e&ipo=images";
  } else if (flavour === "Vanilla") {
    img_url =
      "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Ftse2.mm.bing.net%2Fth%3Fid%3DOIP.cS-vantzMfqxGxBAvrOgLgHaHa%26pid%3DApi&f=1&ipt=eb290fb51af6ffa54caeeed92d1a5e9aff93ba8c6a1c72c24b9d048520f746d9&ipo=images";
  }
  return <img className="ice-cream-img" src={img_url} alt="Ice cream" />;
}

export default IceCreamImage;
