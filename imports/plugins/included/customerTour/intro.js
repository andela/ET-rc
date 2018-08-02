import introJs from "intro.js";

const startIntro = () => {
  const intro = introJs();
  intro.setOptions({
    steps: [
      {
        intro: "Hello world!"
      },
      {
        element: document.querySelector("#search"),
        intro: "This is a tooltip."
      },
      {
        element: "#cart-alert",
        intro: "Ok, wasn't that fun?",
        position: "right"
      },
      {
        element: "#register",
        intro: "Sign in to get started",
        position: "right"
      },
      {
        element: "#cart-icon",
        intro: "More features, more fun.",
        position: "left"
      },
      {
        element: "#search",
        intro: "Another step.",
        position: "bottom"
      },
      {
        element: "#cart-icon",
        intro: "Get it, use it."
      }
    ]
  });
  return intro.start().setOption("doneLabel", "Next page").oncomplete(function () {
    window.location.href = "/account/profile?multipage=true";
  });
};
export default startIntro;
