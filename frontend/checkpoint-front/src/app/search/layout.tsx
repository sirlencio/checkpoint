export default function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
        <p>Esto es el layout</p>
        <main>{children}</main>
    </>

  );
}