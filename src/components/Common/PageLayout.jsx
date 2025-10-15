import { motion } from 'framer-motion';

const PageLayout = ({
  title,
  subtitle,
  actions,
  children,
  maxWidth = 'max-w-7xl'
}) => {
  return (
    <motion.div
      className="page-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
    >
      <div className={`mx-auto ${maxWidth}`}>
        {/* Page Header */}
        <div className="page-header">
          <div>
            <h1 className="page-title">{title}</h1>
            {subtitle && <p className="page-subtitle">{subtitle}</p>}
          </div>
          {actions && <div className="page-actions">{actions}</div>}
        </div>

        {/* Page Content */}
        {children}
      </div>
    </motion.div>
  );
};

export default PageLayout;
