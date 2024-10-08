import { useEffect, useState } from "react";
import "./App.css";

const array = [
  {
    id: 1,
    ad: "Orhan",
    soyad: "Ekici",
    ePosta: "orhanekici@gmail.com",
    dogumTarihi: "1989-03-17",
  },
  {
    id: 3,
    ad: "Fıstık",
    soyad: "Ekici",
    ePosta: "fistique@zero.com.tr",
    dogumTarihi: "2021-03-17",
  },
  {
    id: 4,
    ad: "Lucky",
    soyad: "Ekici",
    ePosta: "luckyboy@zero.com.tr",
    dogumTarihi: "2021-03-17",
  },
  {
    id: 5,
    ad: "Marcel",
    soyad: "Ekici",
    ePosta: "kediozelharekat@zero.com.tr",
    dogumTarihi: "2022-03-17",
  },
  {
    ad: "ece",
    soyad: "ceylan",
    ePosta: "bugrayvx@gmail.comm",
    dogumTarihi: "2000-05-22",
    id: 6,
  },
];
function App() {
  const [data, setData] = useState(array);
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    if (localStorage.data) setData(JSON.parse(localStorage.data));
  }, []);

  function save() {
    localStorage.data = JSON.stringify(data);
  }

  function updateRecord(record) {
    let foundRecord = data.find((x) => x.id === record.id);
    // referansı bozmamak için object assign kullanıyoruz
    // eğer referansı kırarsak bu sefer gösterim sırası bozulur
    // eğer bu notları çözemezseniz referansı kırıp arayüzde probleme odaklanın
    Object.assign(foundRecord, record);
    setData([...data]);
    save();
  }

  function deleteRecord(id) {
    if (!confirm("Emin misiniz?")) {
      return;
    }

    setData(data.filter((x) => x.id !== id));
    save();
  }

  let id = 6;
  function generateId() {
    return id++;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = generateId();
    setData([...data, formObj]);
    setOpen(false);
  }

  return (
    <div className="container">
      <h1>
        Öğrenci bilgi sistemi <button onClick={() => setOpen(true)}>yeni</button>
      </h1>
      {isOpen && (
        <div className="dialog-overlay">
          <dialog open={isOpen}>
            <form onSubmit={handleSubmit}>
              <div className="studentTableCol">
                <input type="text" required name="ad" placeholder="ad" />
              </div>
              <div className="studentTableCol">
                <input type="text" required name="soyad" placeholder="soyad" />
              </div>
              <div className="studentTableCol">
                <input type="email" required name="ePosta" placeholder="e-posta" />
              </div>
              <div className="studentTableCol">
                <input type="date" required name="dogumTarihi" />
              </div>
              <div className="studentTableCol">
                <button onClick={() => setOpen(false)} type="button">
                  vazgeç
                </button>
                <button className="saveBtn" type="submit">
                  ekle
                </button>
              </div>
            </form>
          </dialog>
        </div>
      )}

      <div className="studentTable">
        <ul className="studentTableTitles">
          <li>Ad</li>
          <li>Soyad</li>
          <li>E-Posta Adresi</li>
          <li>Doğum Tarihi</li>
          <li>#</li>
        </ul>
        {data.map((x) => (
          <StudentRow key={x.id} {...x} deleteRecord={deleteRecord} updateRecord={updateRecord} />
        ))}
      </div>
    </div>
  );
}

function StudentRow({ id, ad, soyad, ePosta, dogumTarihi, updateRecord, deleteRecord }) {
  const [isEditing, setEditing] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const formObj = Object.fromEntries(formData);
    formObj.id = id;
    updateRecord(formObj);
    setEditing(false);
  }

  return (
    <form onSubmit={handleSubmit} onDoubleClick={() => setEditing(true)}>
      {isEditing ? (
        <>
          <div className="studentTableCol">
            <input type="text" required name="ad" defaultValue={ad} />
          </div>
          <div className="studentTableCol">
            <input type="text" required name="soyad" defaultValue={soyad} />
          </div>
          <div className="studentTableCol">
            <input type="email" required name="ePosta" defaultValue={ePosta} />
          </div>
          <div className="studentTableCol">
            <input type="date" required name="dogumTarihi" defaultValue={dogumTarihi} />
          </div>
          <div className="studentTableCol">
            <button type="button" onClick={() => setEditing(false)}>
              vazgeç
            </button>
            <button className="saveBtn" type="submit">
              kaydet
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="studentTableCol">{ad}</div>
          <div className="studentTableCol">{soyad}</div>
          <div className="studentTableCol">{ePosta}</div>
          <div className="studentTableCol">{dogumTarihi.split("-").reverse().join(".")}</div>
          <div className="studentTableCol">
            <button type="button" onClick={() => setEditing(true)}>
              düzenle
            </button>
            <button className="delBtn" type="button" onClick={() => deleteRecord(id)}>
              sil
            </button>
          </div>
        </>
      )}
    </form>
  );
}

export default App;
