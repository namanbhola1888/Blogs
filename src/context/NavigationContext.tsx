import React, { createContext, useContext, useEffect, useState } from 'react';

interface RouteState {
  path: string;
  view: 'home' | 'story' | 'category' | 'tag' | 'about' | 'archive';
  params: {
    slug?: string;
  };
}

interface NavigationContextType {
  route: RouteState;
  navigate: (path: string, options?: { replace?: boolean }) => void;
  openStory: (slug: string) => void;
  openCategory: (slug: string) => void;
  openTag: (slug: string) => void;
  goHome: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

function parsePath(pathname: string): RouteState {
  const cleanPath = pathname.replace(/\/+$/, '') || '/';

  if (cleanPath === '/' || cleanPath === '') {
    return { path: '/', view: 'home', params: {} };
  }
  if (cleanPath === '/about') {
    return { path: '/about', view: 'about', params: {} };
  }
  if (cleanPath === '/archive') {
    return { path: '/archive', view: 'archive', params: {} };
  }
  if (cleanPath.startsWith('/story/')) {
    const slug = cleanPath.replace('/story/', '');
    return { path: cleanPath, view: 'story', params: { slug } };
  }
  if (cleanPath.startsWith('/category/')) {
    const slug = cleanPath.replace('/category/', '');
    return { path: cleanPath, view: 'category', params: { slug } };
  }
  if (cleanPath.startsWith('/tag/')) {
    const slug = cleanPath.replace('/tag/', '');
    return { path: cleanPath, view: 'tag', params: { slug } };
  }

  return { path: cleanPath, view: 'home', params: {} };
}

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [route, setRoute] = useState<RouteState>(() => {
    if (typeof window !== 'undefined') {
      return parsePath(window.location.pathname);
    }
    return { path: '/', view: 'home', params: {} };
  });

  useEffect(() => {
    const handlePopState = () => {
      setRoute(parsePath(window.location.pathname));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (path: string, options?: { replace?: boolean }) => {
    if (typeof window !== 'undefined') {
      if (options?.replace) {
        window.history.replaceState({}, '', path);
      } else {
        window.history.pushState({}, '', path);
      }
      setRoute(parsePath(path));
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const openStory = (slug: string) => navigate(`/story/${slug}`);
  const openCategory = (slug: string) => navigate(`/category/${slug}`);
  const openTag = (slug: string) => navigate(`/tag/${slug}`);
  const goHome = () => navigate('/');

  return (
    <NavigationContext.Provider
      value={{ route, navigate, openStory, openCategory, openTag, goHome }}
    >
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = (): NavigationContextType => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigation must be used within a NavigationProvider');
  }
  return context;
};
