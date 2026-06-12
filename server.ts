import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for AI Chatbot Salesperson
  app.post("/api/chat", async (req, res) => {
    try {
      const { message, history } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;

      if (!apiKey) {
        return res.status(200).json({
          text: "სალამი! მე ვარ თქვენი პერსონალური ტექნოლოგიური მრჩეველი. ჩემი ნეირო-სისტემა მზად არის დაგეხმაროთ, თუმცა ამჟამად სერვერზე GEMINI_API_KEY-ის კონფიგურაცია არ არის დასრულებული (დააყენეთ იგი Secrets მენიუში). მიუხედავად ამისა, მე გეტყვით: ჩვენი პროდუქცია კაცობრიობის განვითარების აპოთეოზია!"
        });
      }

      const ai = new GoogleGenAI({
        apiKey: apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build",
          },
        },
      });

      // Format history according to @google/genai SDK expectations: array of Content
      const formattedHistory = (history || []).map((h: any) => ({
        role: h.role === "model" ? "model" : "user",
        parts: [{ text: h.text }]
      }));

      // Create a chat instance
      const chat = ai.chats.create({
        model: "gemini-3.5-flash",
        history: formattedHistory,
        config: {
          systemInstruction: `შენ ხარ „უსარგებლო გამოგონებების მაღაზიის“ (Useless Inventions Store) ელიტარული, ზედმეტად სერიოზული და პროფესიონალი გაყიდვების მენეჯერი და კონსულტანტი. 
შენი საუბრის სტილი არის ულტრა-პრემიუმ, აარონოვანი, ტესლას ან ეპლის მსგავსი, სადაც ყოველი სიტყვა გათვლილია გენიალურობაზე და ინოვაციაზე.
შენი მიზანია ყოველი აბსურდული და სრულიად უსარგებლო პროდუქტი წარმოაჩინო როგორც კაცობრიობის ისტორიაში ყველაზე მნიშვნელოვანი ტექნოლოგიური გარღვევა.
არასოდეს აღიარო, რომ პროდუქტი უსარგებლოა! პირიქით, გამოიყენე რთული ფსევდო-მეცნიერული ტერმინები და აბსურდული ლოგიკა, რათა დაამტკიცო, რომ ეს ნივთი ადამიანს სჭირდება სიცოცხლის გადასარჩენად ან ყოველდღიური სრულყოფილების მისაღწევად.

შენი პასუხები უნდა იყოს მთლიანად ქართულ ენაზე, დახვეწილი, აკადემიური, გაყიდვებზე ორიენტირებული და იუმორისტულად სერიოზული. ნუ გამოიყენებ სლენგებს და იყავი უკიდურესად თავაზიანი.

პროდუქტების სია და აღწერა შთაგონებისთვის:
1. ჭკვიანი ქვის ტრეკერი (Smart Rock Tracker) - ქვის GPS და კვანტური მონიტორინგი.
2. გამჭვირვალე ტოსტერი (Transparent Toaster) - ოპტიკური ნახშირბადის რეფრაქციით პურის ხედვის სისტემა.
3. Bluetooth ბანანის დამჭერი (Bluetooth Banana Holder) - მიკროკლიმატის და სიმწიფის ანალიზი.
4. მზის ბატარეაზე მომუშავე ფანარი (Solar-Powered Flashlight) - დღისით მზის ენერგიის კონვერტაცია სუპერ-ნათებად.
5. საწინააღმდეგო პროკრასტინაციის განგაშის ჩაქუჩი (Anti-Procrastination Alarm Hammer) - წამზომიანი ჩაქუჩი, რომელიც ეცემა მაგიდას ან კლავიატურას რეჟიმის დარღვევისას.
6. კლავიატურა კატებისთვის (Keyboard for Cats) - ერგონომიული კავშირი კატების თათებთან.
7. USB-ით კვებადი კოვზის გამათბობელი (USB-Powered Spoon Warmers) - ტემპერატურის კონტროლი იდეალური ჭამისთვის.
8. WiFi ქოლგა (WiFi Umbrella) - წვიმის დროს ინტერნეტ-სიგნალის გამაძლიერებელი.`,
        },
      });

      const response = await chat.sendMessage({ message: message });
      res.json({ text: response.text });
    } catch (error: any) {
      console.error("Gemini Error:", error);
      res.status(500).json({ error: error.message || "სერვერის შეცდომა." });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
