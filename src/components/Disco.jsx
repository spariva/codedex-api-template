<html>
<head>
    <title>Seleccionar Ecos</title>
    <script src="https://unpkg.com/react/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.js"></script>
    <script src="https://cdn.tailwindcss.com"></script>
    <style>
        body {
            background-color: #0b0e19;
            color: white;
            font-family: 'Arial', sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
        }
        .circle-container {
            position: relative;
            width: 400px;
            height: 400px;
            border: 2px solid #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
        }
        .circle {
            position: absolute;
            width: 80px;
            height: 80px;
            border: 2px solid #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 24px;
            background-color: rgba(255, 255, 255, 0.1);
        }
        .circle img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
        }
        .circle:nth-child(1) { top: 10%; left: 50%; transform: translateX(-50%); }
        .circle:nth-child(2) { top: 50%; left: 10%; transform: translateY(-50%); }
        .circle:nth-child(3) { top: 50%; right: 10%; transform: translateY(-50%); }
        .circle:nth-child(4) { bottom: 10%; left: 25%; transform: translateY(50%); }
        .circle:nth-child(5) { bottom: 10%; right: 25%; transform: translateY(50%); }
        .text-center {
            text-align: center;
            margin-top: 20px;
        }
        .button {
            display: block;
            width: 200px;
            margin: 20px auto;
            padding: 10px;
            border: 2px solid #fff;
            border-radius: 20px;
            text-align: center;
            cursor: pointer;
        }
    </style>
</head>
<body>
    <div id="root"></div>
    <script type="text/babel">
        function Circle({ id, image, onDrop }) {
            const handleDragOver = (e) => {
                e.preventDefault();
            };

            const handleDrop = (e) => {
                e.preventDefault();
                const data = e.dataTransfer.getData("text");
                onDrop(id, data);
            };

            return (
                <div
                    className="circle"
                    onDragOver={handleDragOver}
                    onDrop={handleDrop}
                >
                    {image ? <img src={image} alt={`Circle ${id}`} /> : "+"}
                </div>
            );
        }

        function App() {
            const [images, setImages] = React.useState({
                1: null,
                2: null,
                3: null,
                4: null,
                5: null,
            });

            const handleDrop = (id, data) => {
                setImages((prevImages) => ({
                    ...prevImages,
                    [id]: data,
                }));
            };

            return (
                <div className="text-center">
                    <div className="circle-container">
                        <Circle id={1} image={images[1]} onDrop={handleDrop} />
                        <Circle id={2} image={images[2]} onDrop={handleDrop} />
                        <Circle id={3} image={images[3]} onDrop={handleDrop} />
                        <Circle id={4} image={images[4]} onDrop={handleDrop} />
                        <Circle id={5} image={images[5]} onDrop={handleDrop} />
                    </div>
                    <div>Seleccionar Ecos (0/5)</div>
                    <div className="button">Autoelegir</div>
                </div>
            );
        }

        ReactDOM.render(<App />, document.getElementById('root'));
    </script>
</body>
</html>
