import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { v4 } from "uuid";
import { MdViewCompact } from "react-icons/md";

function App() {
  const [videoId, setVideoId] = useState("sKf1JDpdtpU");
  const [videoInfo, setVideoInfo] = useState();
  const [countView, setCountView] = useState(10);
  const [arr, setArr] = useState([]);
  useEffect(() => {
    async function getListVideo() {
      try {
        let response = await axios.get(
          `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=AIzaSyBu1ps56IgALrAd5OcXaQr9JejnOmYqQbc`
        );
        setVideoInfo(response?.data?.items[0]?.statistics);
      } catch (error) {
        toast.error(error);
      }
    }
    getListVideo();
  }, [videoId]);

  useEffect(() => {
    let arr1 = [];
    for (let i = 0; i < countView; i++) {
      arr1.push(i);
    }
    setArr(arr1);
  }, [countView]);

  function getIdVideo(link) {
    let b = "";
    let a = link.indexOf("watch?v=");
    let c = link.indexOf("&");
    let d = link.indexOf("https://youtu.be/");
    let e = link.indexOf("https://www.youtube.com/");

    if (e !== -1 && a !== -1) {
      if (c !== -1) {
        b = link.slice(a + 8, c);
      } else {
        b = link.slice(a + 8);
      }
    }
    if (d !== -1) {
      b = link.slice(-11);
    }
    if (d === -1 && e === -1) {
      b = link;
      setVideoId(b);
      return;
    }
    if (b !== "") {
      setVideoId(b);
    } else {
      toast.error("Không tìm thấy video Id");
    }
  }

  return (
    <div className="flex items-center justify-center w-full h-full sm:px-10 pb-10 pt-0">
      <div className="p-4 sm:p-10 minHeight95 shadow-lg rounded-xl flex flex-col items-center">
        <img
          src="Logo.png"
          alt="Logo Auto View"
          className="w-2/3 h-auto block"
        />
        <input
          type="text"
          placeholder="Nhập vào link video"
          className="px-3 py-2 rounded-3xl border-2 focus:border-orange-500 outline-none min-w-[300px] sm:min-w-[500px]"
          onChange={(e) => getIdVideo(e?.target?.value)}
        />
        <div className="mb-8 text-base sm:text-xl">
          Nhập vào link Playlist, link Video
        </div>
        <div className="w-full h-5 mb-10 sm:flex items-center justify-between">
          <div className="flex items-center gap-4">
            {videoInfo?.viewCount >= 0 && (
              <p>Lượt xem: {videoInfo?.viewCount}</p>
            )}
            {videoInfo?.likeCount >= 0 && <p>Like: {videoInfo?.likeCount}</p>}
            {videoInfo?.commentCount >= 0 && (
              <p>Comment: {videoInfo?.commentCount}</p>
            )}
          </div>
          <div className="flex items-center gap-1">
            <MdViewCompact className="w-10 h-10 text-red-600"></MdViewCompact>
            <input
              type="number"
              name="board view"
              className="w-16 rounded border-2 focus:border-orange-500 outline-none"
              min="5"
              max="50"
              defaultValue="10"
              step="5"
              placeholder="5"
              onChange={(e) => setCountView(e.target.value)}
            />
          </div>
        </div>
        <ul className="p-2 list-video w-full flex flex-wrap items-center justify-center gap-2">
          {arr?.map(
            (item, i) =>
              item?.snippet?.title !== "Private video" && (
                <li
                  key={v4()}
                  className="w-[144px] h-[81px] rounded-lg border-2 overflow-hidden relative cursor-pointer"
                >
                  <iframe
                    width="144"
                    height="81"
                    src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1&afmt=55`}
                    title="Main xuyên không đánh bại cả thần nhờ vào hệ thống lĩnh vực, Vừa Bắt Đầu Liền Vô Địch Full"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </li>
              )
          )}
        </ul>
      </div>
    </div>
  );
}

export default App;
