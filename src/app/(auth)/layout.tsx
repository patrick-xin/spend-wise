function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-h-screen container h-screen flex items-center justify-center">
      {children}
    </div>
  );
}

export default Layout;
