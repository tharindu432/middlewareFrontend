import { motion } from 'framer-motion';

const LoadingSkeleton = ({ type = 'card', count = 1 }) => {
  const skeletons = Array.from({ length: count });

  if (type === 'card') {
    return (
      <>
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            className="glass-card-light p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="skeleton w-14 h-14 rounded-2xl" />
              <div className="flex-1">
                <div className="skeleton h-4 w-24 mb-2 rounded" />
                <div className="skeleton h-6 w-32 rounded" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="skeleton h-3 w-full rounded" />
              <div className="skeleton h-3 w-3/4 rounded" />
            </div>
          </motion.div>
        ))}
      </>
    );
  }

  if (type === 'table') {
    return (
      <div className="glass-card-light p-6">
        <div className="skeleton h-8 w-48 mb-6 rounded" />
        <div className="space-y-4">
          {skeletons.map((_, index) => (
            <div key={index} className="flex items-center gap-4">
              <div className="skeleton w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <div className="skeleton h-4 w-full rounded" />
                <div className="skeleton h-3 w-2/3 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'list') {
    return (
      <div className="space-y-3">
        {skeletons.map((_, index) => (
          <motion.div
            key={index}
            className="glass-card-light p-4 flex items-center gap-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="skeleton w-12 h-12 rounded-xl" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-4 w-3/4 rounded" />
              <div className="skeleton h-3 w-1/2 rounded" />
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return null;
};

export default LoadingSkeleton;
