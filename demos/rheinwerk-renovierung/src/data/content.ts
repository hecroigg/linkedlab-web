export const services = [
  { id: "fliesen", number: "01", title: "Fliesenarbeiten", description: "Großformat, Naturstein oder klassisches Feinsteinzeug – präzise verlegt und sauber verfugt.", detail: "Wand · Boden · Fugen" },
  { id: "bad", number: "02", title: "Badsanierung", description: "Vom ersten Aufmaß bis zur letzten Armatur: durchdachte Bäder aus einer Hand koordiniert.", detail: "Planung · Ausbau · Finish" },
  { id: "boden", number: "03", title: "Bodenverlegung", description: "Parkett, Vinyl und Fliesen mit einem Aufbau, der dauerhaft trägt und im Detail überzeugt.", detail: "Parkett · Vinyl · Fliese" },
  { id: "innen", number: "04", title: "Innenrenovierung", description: "Räume neu ordnen, Oberflächen erneuern und Bestandswohnungen wieder stimmig machen.", detail: "Wände · Decken · Räume" },
  { id: "trockenbau", number: "05", title: "Trockenbau", description: "Neue Raumaufteilungen, abgehängte Decken und klare Anschlüsse mit präzisem Ausbau.", detail: "Wände · Decken · Nischen" },
  { id: "reparatur", number: "06", title: "Reparaturen & Details", description: "Auch kleinere Arbeiten verdienen eine verlässliche Planung und ein sauberes Ergebnis.", detail: "Ausbesserung · Montage · Finish" },
] as const;

export const projects = [
  { title: "Modernes Badezimmer", location: "Mannheim-Neckarstadt", service: "Badsanierung", image: "/images/bad-modern.webp", size: "large", number: "01" },
  { title: "Altbau neu geordnet", location: "Mannheim-Schwetzingerstadt", service: "Innenrenovierung", image: "/images/altbau.webp", size: "standard", number: "02" },
  { title: "Naturstein Badezimmer", location: "Heidelberg", service: "Fliesenarbeiten", image: "/images/naturstein-bad.webp", size: "standard", number: "03" },
  { title: "Wohnung mit neuer Struktur", location: "Ludwigshafen", service: "Trockenbau & Ausbau", image: "/images/trockenbau.webp", size: "wide", number: "04" },
  { title: "Fischgrät im Altbau", location: "Mannheim-Oststadt", service: "Bodenverlegung", image: "/images/altbau.webp", size: "standard", number: "05" },
  { title: "Kompaktes Gäste-WC", location: "Mannheim-Lindenhof", service: "Badsanierung", image: "/images/gaeste-wc.webp", size: "standard", number: "06" },
] as const;

export const processSteps = [
  { number: "01", title: "Anfrage", text: "Sie erzählen uns kurz von Ihrem Vorhaben. Wir klären die wichtigsten Fragen und vereinbaren einen Termin." },
  { number: "02", title: "Besichtigung", text: "Vor Ort prüfen wir Bestand, Maße und Materialien – die Grundlage für eine belastbare Planung." },
  { number: "03", title: "Angebot", text: "Sie erhalten eine klare, nachvollziehbare Kalkulation mit abgestimmtem Ablauf und Zeitrahmen." },
  { number: "04", title: "Umsetzung", text: "Wir koordinieren die Arbeiten, halten Sie auf dem Laufenden und übergeben sauber und termingerecht." },
] as const;

export const testimonials = [
  { quote: "Von der ersten Beratung bis zur Übergabe war der Ablauf klar. Besonders die saubere Ausführung hat uns überzeugt.", name: "Anna & Lukas M.", project: "Beispiel · Badsanierung" },
  { quote: "Das Angebot war verständlich, Rückfragen wurden schnell beantwortet und die Details sehen genau so aus wie geplant.", name: "Mehmet K.", project: "Beispiel · Wohnungsausbau" },
  { quote: "Unser Altbau wirkt wieder ruhig und hochwertig. Die Abstimmung zwischen Boden, Wänden und Einbauten war hervorragend.", name: "Clara S.", project: "Beispiel · Innenrenovierung" },
] as const;
