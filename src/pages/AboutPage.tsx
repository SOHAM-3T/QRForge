export function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl mb-8">About QRForge</h1>
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <p className="text-lg text-muted-foreground leading-relaxed mb-6">
          QRForge is a privacy-first, fully client-side QR code design studio. We built this tool because we wanted a way to create beautiful, customized QR codes without sacrificing privacy or paying exorbitant subscription fees.
        </p>
        
        <h2 className="text-2xl font-semibold mt-10 mb-4">Privacy First</h2>
        <p className="text-muted-foreground mb-4">
          When you use QRForge, your data never leaves your browser. We don't have servers that process your QR codes, we don't save your designs to a cloud database, and we don't track the codes you generate.
        </p>
        <p className="text-muted-foreground mb-4">
          All processing, rendering, and exporting happens entirely on your device using modern web technologies.
        </p>

        <h2 className="text-2xl font-semibold mt-10 mb-4">Open Source Tech</h2>
        <p className="text-muted-foreground mb-4">
          QRForge is built on top of excellent open-source projects, including:
        </p>
        <ul className="list-disc pl-6 text-muted-foreground space-y-2 mb-8">
          <li>React and Vite</li>
          <li>qr-code-styling for the core rendering engine</li>
          <li>Tailwind CSS and shadcn/ui for the interface</li>
          <li>Zustand for state management</li>
        </ul>
      </div>
    </div>
  );
}
