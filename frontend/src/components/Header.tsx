interface HeaderProps {
  className?: string; // optional
}


export default function Header({className}: HeaderProps) {
  return (
    <header className={className ?? "layout-header"}>
      <h1>Lagersystem</h1>
      <nav>
        <a href="/">Home</a>
        <a href="/products">Products</a>
        <a href="/customer">Customer</a>
        <a href="/admin">Admin</a>
      </nav>
    </header>
  );
}