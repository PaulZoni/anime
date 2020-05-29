/**
 * @flow
 */
import 'react-native-gesture-handler';
import React, {useState, useContext, useEffect} from 'react';
import TopController from './View/Top/TopController';
import MangaController from './View/Manga/MangaController';
import OpenImage from './View/OpenImage/OpenImage';
import {BackHandler} from 'react-native';

type View = 'Top' | 'Manga' | 'OpenImage';

export const NavigateContext = React.createContext<{
  view: View,
  navigateTo: () => void,
  bundle: Object,
  putInBundle: () => void,
}>();

export const NavigateProvider = ({children}) => {
  const [view, setView] = useState<View>('Top');
  const [bundle, setBundle] = useState<View>({});

  const navigateTo = (v: View) => {
    setView(v);
  };

  const putInBundle = (o: Object) => {
    setBundle(o);
  };

  return (
    <NavigateContext.Provider value={{view, navigateTo, bundle, putInBundle}}>
      {children}
    </NavigateContext.Provider>
  );
};

const App = () => {
  const {view, navigateTo, bundle, putInBundle} = useContext(NavigateContext);
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      if (view === 'Manga') navigateTo('Top');
      if (view === 'OpenImage') navigateTo('Manga');
      return true;
    });
  });

  switch (view) {
    case 'Top':
      return <TopController />;
    case 'Manga':
      return <MangaController />;
    case 'OpenImage':
      return <OpenImage />;
    default:
      return <TopController />;
  }
};

const RenderApp = () => (
  <NavigateProvider>
    <App />
  </NavigateProvider>
);

export default RenderApp;
