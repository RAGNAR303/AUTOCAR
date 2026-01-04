export function Footer() {
  const date = new Date();

  return (
    <footer className="p-3">
      <p className="text-center font-extralight text-base">
        © 1995-{date.getFullYear()} AutoCar. Todos os direitos reservados.
      </p>
    </footer>
  );
}
