function useNavigationTrakcer(navigation) {
  /* eslint-disable no-unused-vars */
  function tag(track) {
    // TODO: Tracking

    const { goBack, navigate, pop, popToTop, push } = navigation;
    return { goBack, navigate, pop, popToTop, push };
  }

  const {
    addListener,
    canGoBack,
    dispatch,
    isFocused,
    removeListener,
    reset,
    setParams,
  } = navigation;

  return {
    addListener,
    canGoBack,
    dispatch,
    isFocused,
    removeListener,
    reset,
    setParams,
    tag,
  };
}

export { useNavigationTrakcer };
