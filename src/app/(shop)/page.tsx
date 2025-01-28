import { titleFont } from "@/config/font";

export default function Home() {
  return (
    <div>
      <h1>Hola mundo 1</h1>
      <h1 className={`${titleFont.className} font-bold`}>Hola mundo 2</h1>
    </div>
  );
}
