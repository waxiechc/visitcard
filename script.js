let imageBlob = null; // Переменная для хранения Blob-данных изображения высокого разрешения

// Функция для генерации случайного абстрактного изображения
function generateRandomImage() {
    const randomNumber = Math.floor(Math.random() * 1000);
    const highResUrl = `https://picsum.photos/1080/1080?random=${randomNumber}`;
    const imgElement = document.getElementById("randomImage");

    imgElement.classList.remove("visible"); // Убираем видимость перед загрузкой

    // Загружаем изображение в высоком разрешении для скачивания
    fetch(highResUrl)
        .then(response => response.blob())
        .then(blob => {
            imageBlob = blob; // Сохраняем Blob для дальнейшего скачивания
            const objectURL = URL.createObjectURL(blob); // Создаем временный URL для отображения

            imgElement.src = objectURL; // Устанавливаем изображение на экране
            imgElement.classList.add("visible"); // Показ изображения после загрузки
        })
        .catch(() => alert("Ошибка при загрузке изображения. Попробуйте еще раз."));
}

// Функция для скачивания сохраненного изображения
function downloadImage() {
    if (imageBlob) {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(imageBlob); // Используем сохранённый Blob для загрузки
        link.download = "abstract_image.jpg";
        document.body.appendChild(link);
        link.click(); // Автоматически скачиваем изображение
        document.body.removeChild(link);
    } else {
        alert("Please first generate an image.");
    }
}