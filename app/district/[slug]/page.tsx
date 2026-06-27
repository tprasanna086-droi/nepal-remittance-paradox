import { notFound } from "next/navigation";
import YieldChart from "@/components/YieldChart";
import DistrictCard from "@/components/DistrictCard";

interface DistrictPageProps {
  params: { slug: string };
}

const DISTRICTS = [
  "achham",
  "arghakhanchi",
  "baglung",
  "baitadi",
  "bajhang",
  "bajura",
  "banke",
  "bara",
  "bardiya",
  "bhaktapur",
  "bhojpur",
  "chitwan",
  "dadeldhura",
  "dailekh",
  "dang",
  "darchula",
  "dhading",
  "dhankuta",
  "dhanusa",
  "dholkha",
  "dolpa",
  "doti",
  "gorkha",
  "gulmi",
  "humla",
  "ilam",
  "jajarkot",
  "jhapa",
  "jumla",
  "kailali",
  "kalikot",
  "kanchanpur",
  "kapilvastu",
  "kaski",
  "kathmandu",
  "kavrepalanchok",
  "khotang",
  "lalitpur",
  "lamjung",
  "mahottari",
  "makwanpur",
  "manang",
  "morang",
  "mugu",
  "mustang",
  "myagdi",
  "nawalparasi",
  "nuwakot",
  "okhaldhunga",
  "palpa",
  "panchthar",
  "parbat",
  "parsa",
  "pyuthan",
  "ramechhap",
  "rasuwa",
  "rautahat",
  "rolpa",
  "rukum",
  "rupandehi",
  "salyan",
  "sankhuwasabha",
  "saptari",
  "sarlahi",
  "sindhuli",
  "sindhupalchok",
  "siraha",
  "solukhumbu",
  "sunsari",
  "surkhet",
  "syangja",
  "tanahun",
  "taplejung",
  "terhathum",
  "udayapur",
];

export default function DistrictPage({ params }: DistrictPageProps) {
  const { slug } = params;

  if (!DISTRICTS.includes(slug)) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <DistrictCard slug={slug} />
      <section className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">
          Yield Trends — {slug.charAt(0).toUpperCase() + slug.slice(1)}
        </h2>
        <YieldChart district={slug} />
      </section>
    </div>
  );
}
