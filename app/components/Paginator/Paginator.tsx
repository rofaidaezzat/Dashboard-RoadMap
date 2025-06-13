import React from "react";
import "./Paginator.css";

interface IProps {
    page: number;
    pageCount: number;
    total: number;
    isLoading: boolean;
    onClickPrev: () => void;
    onClickNext: () => void;
}

const Paginator = ({
    page,
    pageCount,
    total,
    isLoading,
    onClickPrev,
    onClickNext,
}: IProps) => {
    return (
    <div className="flex flex-col items-center gap-2">
        <div className="button-container">
                <button
                className={`button-3d ${page === 1 || isLoading ? "disabled" : ""}`}
                    onClick={onClickPrev}
                    disabled={page === 1 || isLoading }
                    aria-label="Previous Page"
                >
                    <div className="button-top">
                        <span className="material-icons disabled:bg-gray-400">❮</span>
                    </div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
                <button
                className={`button-3d ${page === pageCount || isLoading ? "disabled" : ""}`}
                    onClick={onClickNext}
                    disabled={page === pageCount ||isLoading}
                    aria-label="Next Page"
                >
                    <div className="button-top">
                        <span className="material-icons">❯</span>
                    </div>
                    <div className="button-bottom"></div>
                    <div className="button-base"></div>
                </button>
        </div>
        <p className="text-xs text-gray-500 mx-3">
        Page <span className="font-semibold text-purple-700 mx-1">{page}</span> of
        <span className="font-semibold text-purple-700 mx-1">{pageCount}</span> | Total:
        <span className="font-semibold text-gray-700 mx-1">{total}</span>
        </p>
    </div>
    );
};

export default Paginator;