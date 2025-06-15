// app/text-isl/page.tsx
import SplineBackground from "@/components/SplineBackground";
import AlphabetInput from "@/components/AlphabetInput";

export default function Page() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      <SplineBackground />
      <AlphabetInput />
    </div>
  );
}
