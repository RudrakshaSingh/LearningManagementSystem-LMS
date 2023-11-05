import { useNavigate } from "react-router-dom";

function CourseCard({ data }) {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate("/course/description/", { state: { ...data } })}
            className="text-white w-[22rem] h-[430px] shadow-[0_0_50px_black] rounded-3xl cursor-pointer group overflow-hidden bg-zinc-800"
        >
            <div className="overflow-hidden flex-col items-center justify-center">
                <img
                    className="p-2 h-48 w-full rounded-3xl group-hover:scale=[1,2] transition-all ease-in-out diration-300"
                    src={data?.thumbnail?.secure_url}
                    alt="course thumbnail"
                />
                <div className="p-3 space-y-1 text-white">
                    <h2 className="text-xl font-bold text-gray-500 line-clamp-2">Title : {data?.title}</h2>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Instructor : </span>
                        {data?.createdBy}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Category : </span>
                        {data?.category}
                    </p>
                    <p className="line-clamp-2">
                        <span className="text-yellow-500 font-bold">Description : </span> {data?.description}
                    </p>
                    <p className="font-semibold">
                        <span className="text-yellow-500 font-bold">Total lectures : </span>
                        {data?.numbersOfLectures}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default CourseCard;
