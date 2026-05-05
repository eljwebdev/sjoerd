const animProject = {
  old: {
    name: "moveNav",
    duration: "0.6s",
    easing: "ease-in",
    fillMode: "forwards",
    direction: "normal",
  },
  new: {
    name: "moveX",
    duration: "0.6s",
    easing: "ease-out",
    direction: "reverse",
    fillMode: "backwards",
  },
};

export const customTransitionProject = {
  forwards: animProject,
  backwards: animProject,
};
