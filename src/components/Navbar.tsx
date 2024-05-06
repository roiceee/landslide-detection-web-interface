export default function Navbar() {
  return (
    <div className="navbar bg-base-100 border-b px-4 xl:px-64">
      <a className="btn btn-ghost text-xl">
        <img src="/logo.jpg" height={50} width={50} className="rounded-full" />
        <div className=" hidden sm:block">
          Early Landslide Monitoring Prevention
        </div>
      </a>
    </div>
  );
}
