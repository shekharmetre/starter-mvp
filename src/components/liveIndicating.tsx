export function LiveIndicator({ className = '' }) {
    return (
        <div className={`flex items-center gap-2 text-sm font-semibold text-green-600 ${className}`}>
            <svg width='8' height='8' viewBox='0 0 8 8' xmlns='http://www.w3.org/2000/svg'>
                <circle cx='4' cy='4' r='4' fill='currentColor'>
                    <animate attributeName='opacity' values='1;1;0;0;1' dur='1s' repeatCount='indefinite' />
                </circle>
            </svg>
        </div>
    );
}
