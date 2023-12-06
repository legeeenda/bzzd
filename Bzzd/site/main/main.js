// Получение ссылки на элементы страницы
const uploadForm = document.getElementById('upload-form');
const fileInput = document.getElementById('file-input');
const fileTable = document.getElementById('file-tabl');

// Создание объекта для хранения информации о файлах
const fileList = [];


// Функция для добавления нового файла в таблицу файлов
function addFileRow(file) {
  const row = document.createElement('tr');
  row.innerHTML = `
    <td>${file.name}</td>
    <td>${file.uploadDate}</td>
    <td>${file.size}</td>
    <td>${file.username}</td>
              <td id="downloadCount${file.id}">${file.downloadCount}</td> <!-- Отображаем число скачиваний -->
    <td>
    <button onclick="incrementDownloadCountAndSaveFile(${file.id})">Скачать и сохранить</button>
      <button onclick="deleteFile(${file.id})">Удалить</button>
    </td>
  `;
  fileTable.appendChild(row);
}
function incrementDownloadCountAndSaveFile(fileId) {
  incrementDownloadCount(fileId);
  saveFile();
}
// Функция для увеличения числа скачиваний
function incrementDownloadCount(fileId) {
  const downloadCountElement = document.getElementById(`downloadCount${fileId}`);
  let currentCount = parseInt(downloadCountElement.innerText, 10);
  currentCount++;
  downloadCountElement.innerText = currentCount;
}

// Функция для обновления таблицы файлов
function updateFileTable() {
  // Очистка таблицы
  fileTable.innerHTML = `
    <tr>
      <th>Имя файла</th>
      <th>Дата загрузки</th>
      <th>Размер файла</th>
      <th>Имя пользователя</th>
      <th>Число скачиваний</th>
      <th>Действия</th>
    </tr>
  `;

  // Добавление всех файлов в таблицу
  fileList.forEach(file => {
    addFileRow(file);
  });
}

// Функция для загрузки файла
function uploadFile(e) {
  e.preventDefault();

  const file = fileInput.files[0];
  const currentDate = new Date();
  const uploadDate = currentDate.toLocaleString();

  // Генерация уникального ID для файла
  const id = Math.floor(Math.random() * 100000);

  // Создание объекта файла и добавление его в список файлов
  const newFile = {
    id: id,
    name: file.name,
    uploadDate: uploadDate,
    size: file.size,
    username: 'Legeenda', // Замените на имя пользователя, если есть система аутентификации
    downloadCount: 0
  };

  fileList.push(newFile);

  // Обновление таблицы файлов
  updateFileTable();

  // Очистка поля выбора файла
  uploadForm.reset();
}

// Функция для скачивания файла
function downloadFile(id) {
  // Найти файл по его ID
  const file = fileList.find(file => file.id === id);

  // Увеличить счетчик скачиваний
  file.downloadCount++;

  // Можно добавить дополнительные действия, такие как реальное скачивание файла

  // Обновление таблицы файлов
  updateFileTable();
}

// Функция для удаления файла
function deleteFile(id) {
  // Найти индекс файла в списке файлов по его ID
  const fileIndex = fileList.findIndex(file => file.id === id);

  if (fileIndex !== -1) {
    // Удалить файл из списка файлов
    fileList.splice(fileIndex, 1);

    updateFileTable();
    uploadForm.reset();
  }
  
  // Функция для скачивания файла
  function downloadFile(id) {
    // Найти файл по ID
    const file = fileList.find(file => file.id === id);
  
    if (file) {
      // Увеличить счетчик скачиваний
      file.downloadCount++;
  
      // Обновить таблицу файлов
      updateFileTable();
  
      // Здесь вы можете добавить код для скачивания файла
    }
  }
  
  // Функция для удаления файла
  function deleteFile(id) {
    // Найти файл по ID
    const index = fileList.findIndex(file => file.id === id);
  
    if (index !== -1) {
      // Удалить файл из списка файлов
      fileList.splice(index, 1);
  
      // Обновить таблицу файлов
      updateFileTable();
    }
  }
}

// Обработчик события отправки формы загрузки файла
uploadForm.addEventListener('submit', uploadFile);