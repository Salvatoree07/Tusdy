Tusdy is a web application designed to generate concept maps and outlines quickly and intuitively. The application is ideal for various uses, including hobbies, reviewing, and testing. It was created with the goal of overcoming the limitations of other platforms (such as the lack of alternative layouts, poor visual flexibility, and slowness) by offering a smooth and highly customizable user experience.

🚀 *Main Features*
-**Layout Selection**: Users can choose the type of map to generate, opting between linear outlines or concept maps.
-**Detail Customization**: It is possible to specify detailed parameters for generation, such as the topic, style, sources, theme, and tone.
-**Interactive Playground**: Thanks to the integration of *Excalidraw*, the user has a real playground to visually view and manipulate the map.
-**Save and Export**: The created maps can be saved and exported in various formats, including PNG and SVG.

💻 Tech Stack
The project is built with modern technologies to ensure performance and scalability:
Front-End: Developed in Next.js.
UI Components: Uses Shadcn.
Styling: Managed via SCSS and Tailwind CSS.
Graphical Playground: Excalidraw.
Back-End & Database: Based on APIs and Supabase.
Artificial Intelligence Engine: Integration with Gemini API (gemini-2.0-flash model).
Deployment: Hosted on Vercel.

🧠 The Role of Artificial Intelligence
Tusdy leverages the **Gemini 2.0 Flash** model to process content:
For **Linear Outlines**: The AI generates simple, unformatted text, structured into 10 mandatory sections separated by semicolons, including details, sources, questions, and formatted links.
For **Concept Maps**: The AI generates an output strictly in JSON format using a recursive schema (with titles and 'children'). Titles are limited to a maximum of 5 words.
Generation Algorithm: A custom algorithm takes the structured data and dynamically generates the graphical elements (text boxes and connection arrows), **calculating the (x, y)** coordinates to render them directly within the Excalidraw whiteboard.

🔮 Future Developments
The project plans several implementations to improve the user experience:
Image Generation: Implementation of an AI system to generate custom illustrations consistent with the map's contents.
Concept Map Improvement: Overcoming the rigid 'fishbone' schema to allow the creation of authentic mind maps with freely connectable nodes and a more natural spatial structure.
Cloud Storage: Full integration with Supabase to allow users to save their maps in a personal archive, being able to review, edit, or share them at any time.

Custom Layouts: Addition of options to freely customize color palettes, backgrounds, and node shapes according to individual tastes.
